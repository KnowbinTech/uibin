<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { DatePickerProps, DateRange, DatePickerView } from './types.js';
  import {
    formatDate,
    parseDate,
    getDayNames,
    getMonthNames,
    generateMonthDays,
    generateYearRange,
    isDateDisabled,
    isDateHighlighted,
    isToday,
    isSameDay,
    isDateInRange,
    addMonths,
    addYears
  } from './date-utils.js';

  type $$Props = DatePickerProps;

  // Default props
  export let label: $$Props['label'] = undefined;
  export let helperText: $$Props['helperText'] = undefined;
  export let errorMessage: $$Props['errorMessage'] = undefined;
  export let variant: $$Props['variant'] = 'default';
  export let size: $$Props['size'] = 'md';
  export let disabled: $$Props['disabled'] = false;
  export let required: $$Props['required'] = false;
  export let id: $$Props['id'] = `datepicker-${Math.random().toString(36).substring(2, 9)}`;
  export let name: $$Props['name'] = undefined;
  export let placeholder: $$Props['placeholder'] = 'Select date';
  export let value: $$Props['value'] = null;
  export let range: $$Props['range'] = false;
  export let rangeValue: $$Props['rangeValue'] = { start: null, end: null };
  export let minDate: $$Props['minDate'] = undefined;
  export let maxDate: $$Props['maxDate'] = undefined;
  export let dateFormat: $$Props['dateFormat'] = 'yyyy-MM-dd';
  export let headerFormat: $$Props['headerFormat'] = 'MMMM yyyy';
  export let highlightedDates: $$Props['highlightedDates'] = undefined;
  export let disabledDates: $$Props['disabledDates'] = undefined;
  export let closeOnSelect: $$Props['closeOnSelect'] = true;
  export let defaultView: $$Props['defaultView'] = 'days';
  export let rangeSelection: $$Props['rangeSelection'] = false;
  export let fullWidth: $$Props['fullWidth'] = false;
  export let clearable: $$Props['clearable'] = false;
  export let locale: $$Props['locale'] = undefined;
  export let firstDayOfWeek: $$Props['firstDayOfWeek'] = 0;
  export let leftIcon: $$Props['leftIcon'] = undefined;
  export let position: $$Props['position'] = 'bottom';
  export let showTodayButton: $$Props['showTodayButton'] = false;
  export let showMonthYearDropdowns: $$Props['showMonthYearDropdowns'] = false;
  export let showWeekNumbers: $$Props['showWeekNumbers'] = false;

  // Custom class
  let className = '';
  export { className as class };
  
  // Internal state
  let isOpen = false;
  let currentView: DatePickerView = defaultView;
  let currentMonth = value ? new Date(value) : new Date();
  let calendarEl: HTMLDivElement;
  let inputEl: HTMLInputElement;
  let displayText = '';
  
  // Set to first day of month for calendar rendering
  $: currentMonth.setDate(1);
  
  // Event dispatcher
  const dispatch = createEventDispatcher();

  // Reactive declarations for classes
  $: inputSizeClasses = {
    sm: 'h-8 text-xs px-2',
    md: 'h-10 text-sm px-3',
    lg: 'h-12 text-base px-4'
  };
  
  $: calendarSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  $: labelSizeClasses = {
    sm: 'text-xs mb-1',
    md: 'text-sm mb-1.5',
    lg: 'text-base mb-2'
  };
  
  $: helperSizeClasses = {
    sm: 'text-xs mt-1',
    md: 'text-xs mt-1.5',
    lg: 'text-sm mt-2'
  };
  
  $: variantClasses = {
    default: 'bg-background border border-input rounded-md focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary',
    filled: 'bg-muted border border-transparent focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-background',
    outline: 'bg-transparent border border-input rounded-md focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary',
    flushed: 'bg-transparent border-b border-input rounded-none focus-within:ring-0 focus-within:border-b-2 focus-within:border-primary'
  };
  
  $: positionClasses = {
    top: 'bottom-full mb-1',
    bottom: 'top-full mt-1',
    left: 'right-full mr-1',
    right: 'left-full ml-1'
  };
  
  // Generate calendar data
  $: dayNames = getDayNames(locale, 'short');
  $: monthNames = getMonthNames(locale, 'long');
  $: calendarDays = generateMonthDays(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    firstDayOfWeek
  );
  $: years = generateYearRange(currentMonth.getFullYear(), 10);
  $: hasError = !!errorMessage;
  
  // Ordering day names based on firstDayOfWeek
  $: orderedDayNames = [...dayNames.slice(firstDayOfWeek), ...dayNames.slice(0, firstDayOfWeek)];
  
  // Format display text for input
  $: {
    if (range && rangeSelection && rangeValue) {
      const startText = rangeValue.start ? formatDate(rangeValue.start, dateFormat) : '';
      const endText = rangeValue.end ? formatDate(rangeValue.end, dateFormat) : '';
      displayText = startText && endText ? `${startText} - ${endText}` : startText || '';
    } else {
      displayText = value ? formatDate(value, dateFormat) : '';
    }
  }
  
  // Handlers
  function toggleCalendar() {
    if (disabled) return;
    isOpen = !isOpen;
    
    if (isOpen) {
      // Reset current view when opening
      currentView = defaultView;
      
      // Set current month based on selected date or current date
      if (range && rangeSelection && rangeValue.start) {
        currentMonth = new Date(rangeValue.start);
        currentMonth.setDate(1);
      } else if (value) {
        currentMonth = new Date(value);
        currentMonth.setDate(1);
      } else {
        currentMonth = new Date();
        currentMonth.setDate(1);
      }
      
      // Focus trap and click outside handling
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    dispatch('toggle', { isOpen });
  }
  
  function handleClickOutside(event: MouseEvent) {
    if (
      calendarEl &&
      !calendarEl.contains(event.target as Node) &&
      inputEl &&
      !inputEl.contains(event.target as Node)
    ) {
      isOpen = false;
      document.removeEventListener('mousedown', handleClickOutside);
      dispatch('close');
    }
  }
  
  function handleSelectDate(date: Date) {
    if (isDateDisabled(date, minDate, maxDate, disabledDates)) return;
    
    if (range && rangeSelection) {
      // Range selection logic
      if (!rangeValue.start || (rangeValue.start && rangeValue.end)) {
        // Start new range
        rangeValue = { start: date, end: null };
      } else {
        // Complete range
        if (date < rangeValue.start) {
          // If second click is before start, swap them
          rangeValue = { start: date, end: rangeValue.start };
        } else {
          rangeValue = { start: rangeValue.start, end: date };
        }
        
        if (closeOnSelect) {
          isOpen = false;
          document.removeEventListener('mousedown', handleClickOutside);
        }
      }
      
      dispatch('change', { range: rangeValue });
    } else {
      // Single date selection
      value = date;
      
      if (closeOnSelect) {
        isOpen = false;
        document.removeEventListener('mousedown', handleClickOutside);
      }
      
      dispatch('change', { value });
    }
  }
  
  function handleNextMonth() {
    currentMonth = addMonths(currentMonth, 1);
  }
  
  function handlePrevMonth() {
    currentMonth = addMonths(currentMonth, -1);
  }
  
  function handleNextYear() {
    currentMonth = addYears(currentMonth, 1);
  }
  
  function handlePrevYear() {
    currentMonth = addYears(currentMonth, -1);
  }
  
  function handleSelectYear(year: number) {
    currentMonth.setFullYear(year);
    currentMonth = new Date(currentMonth);
    currentView = 'months';
  }
  
  function handleSelectMonth(monthIndex: number) {
    currentMonth.setMonth(monthIndex);
    currentMonth = new Date(currentMonth);
    currentView = 'days';
  }
  
  function handleViewChange(view: DatePickerView) {
    currentView = view;
  }
  
  function handleSelectToday() {
    const today = new Date();
    if (!isDateDisabled(today, minDate, maxDate, disabledDates)) {
      handleSelectDate(today);
    }
  }
  
  function handleClear() {
    if (range && rangeSelection) {
      rangeValue = { start: null, end: null };
      dispatch('change', { range: rangeValue });
    } else {
      value = null;
      dispatch('change', { value });
    }
  }
  
  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const parsedDate = parseDate(target.value);
    
    if (parsedDate && !isDateDisabled(parsedDate, minDate, maxDate, disabledDates)) {
      value = parsedDate;
      dispatch('change', { value });
    }
  }
  
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      isOpen = false;
      document.removeEventListener('mousedown', handleClickOutside);
    } else if (event.key === 'Enter' || event.key === ' ') {
      toggleCalendar();
    }
  }
</script>

<div class={`inline-flex flex-col ${fullWidth ? 'w-full' : ''}`}>
  {#if label}
    <label 
      for={id}
      class={`${labelSizeClasses[size]} font-medium ${hasError ? 'text-red-500' : 'text-foreground'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {label}{required ? ' *' : ''}
    </label>
  {/if}
  
  <div class="relative w-full">
    <!-- Input field -->
    <div 
      class={`
        relative flex items-center w-full ${inputSizeClasses[size]} 
        ${variantClasses[variant]} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${hasError ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20' : ''}
      `}
      on:click={toggleCalendar}
      on:keydown={handleKeyDown}
      tabindex="0"
      role="combobox"
      aria-expanded={isOpen}
      aria-controls={`${id}-calendar`}
      aria-haspopup="true"
    >
      {#if leftIcon}
        <span class="mr-2 text-muted-foreground">
          <!-- Left icon component would go here -->
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </span>
      {/if}
      
      <input
        type="text"
        bind:this={inputEl}
        {id}
        {name}
        {disabled}
        {required}
        {placeholder}
        value={displayText}
        on:change={handleInputChange}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        class="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
        readonly={range && rangeSelection}
        {...$$restProps}
      />
      
      {#if clearable && (displayText || (range && rangeSelection && (rangeValue.start || rangeValue.end)))}
        <button
          type="button"
          class="p-1 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full"
          on:click|stopPropagation={handleClear}
          aria-label="Clear date"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      {/if}
      
      <svg 
        class="w-4 h-4 ml-2 text-muted-foreground" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
    
    <!-- Calendar dropdown -->
    {#if isOpen}
      <div 
        bind:this={calendarEl}
        id={`${id}-calendar`}
        class={`
          absolute z-50 ${positionClasses[position]}
          bg-background shadow-lg border border-border rounded-md p-3
          w-[280px] ${calendarSizeClasses[size]}
        `}
      >
        <!-- Calendar header -->
        <div class="flex justify-between items-center mb-2">
          {#if currentView === 'days'}
            <button
              type="button"
              class="p-1 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              on:click={handlePrevMonth}
              aria-label="Previous month"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <button
              type="button"
              class="font-medium px-2 py-1 rounded hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              on:click={() => handleViewChange('months')}
            >
              {formatDate(currentMonth, headerFormat)}
            </button>
            
            <button
              type="button"
              class="p-1 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              on:click={handleNextMonth}
              aria-label="Next month"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          {:else if currentView === 'months'}
            <button
              type="button"
              class="p-1 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              on:click={handlePrevYear}
              aria-label="Previous year"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <button
              type="button"
              class="font-medium px-2 py-1 rounded hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              on:click={() => handleViewChange('years')}
            >
              {currentMonth.getFullYear()}
            </button>
            
            <button
              type="button"
              class="p-1 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              on:click={handleNextYear}
              aria-label="Next year"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          {:else if currentView === 'years'}
            <button
              type="button"
              class="p-1 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              on:click={() => handleSelectYear(years[0] - 10)}
              aria-label="Previous decade"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <span class="font-medium">
              {years[0]} - {years[years.length - 1]}
            </span>
            
            <button
              type="button"
              class="p-1 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              on:click={() => handleSelectYear(years[years.length - 1] + 1)}
              aria-label="Next decade"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          {/if}
        </div>
        
        <!-- Days view -->
        {#if currentView === 'days'}
          <div class="grid grid-cols-7 gap-1 mb-2">
            {#each orderedDayNames as day}
              <div class="text-center text-muted-foreground text-xs py-1">
                {day}
              </div>
            {/each}
          </div>
          
          <div class="grid grid-cols-7 gap-1">
            {#each calendarDays as day}
              {@const isCurrentMonth = day.getMonth() === currentMonth.getMonth()}
              {@const isSelected = range && rangeSelection
                ? isSameDay(day, rangeValue.start) || isSameDay(day, rangeValue.end)
                : isSameDay(day, value)}
              {@const isInRange = range && rangeSelection && rangeValue.start && rangeValue.end
                ? isDateInRange(day, rangeValue.start, rangeValue.end)
                : false}
              {@const isDisabled = isDateDisabled(day, minDate, maxDate, disabledDates)}
              {@const isHighlighted = isDateHighlighted(day, highlightedDates)}
              {@const isTodayDate = isToday(day)}
              
              <button
                type="button"
                class={`
                  w-8 h-8 flex items-center justify-center rounded-full
                  ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}
                  ${isSelected ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}
                  ${!isSelected && isInRange ? 'bg-primary/10 text-foreground' : ''}
                  ${!isSelected && !isInRange && !isDisabled ? 'hover:bg-muted' : ''}
                  ${isTodayDate && !isSelected ? 'border border-primary text-primary' : ''}
                  ${isHighlighted && !isSelected ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/20 dark:text-amber-500' : ''}
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  focus:outline-none focus:ring-2 focus:ring-primary/50
                `}
                disabled={isDisabled}
                on:click={() => handleSelectDate(day)}
                aria-label={formatDate(day, 'yyyy-MM-dd')}
                aria-selected={isSelected}
                aria-disabled={isDisabled}
              >
                {day.getDate()}
              </button>
            {/each}
          </div>
        {:else if currentView === 'months'}
          <!-- Months view -->
          <div class="grid grid-cols-3 gap-2">
            {#each monthNames as month, index}
              {@const isSelected = currentMonth.getMonth() === index}
              
              <button
                type="button"
                class={`
                  py-2 rounded text-center
                  ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                  focus:outline-none focus:ring-2 focus:ring-primary/50
                `}
                on:click={() => handleSelectMonth(index)}
              >
                {month.substring(0, 3)}
              </button>
            {/each}
          </div>
        {:else if currentView === 'years'}
          <!-- Years view -->
          <div class="grid grid-cols-3 gap-2">
            {#each years as year}
              {@const isSelected = currentMonth.getFullYear() === year}
              
              <button
                type="button"
                class={`
                  py-2 rounded text-center
                  ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                  focus:outline-none focus:ring-2 focus:ring-primary/50
                `}
                on:click={() => handleSelectYear(year)}
              >
                {year}
              </button>
            {/each}
          </div>
        {/if}
        
        {#if showTodayButton}
          <div class="mt-3 flex justify-center">
            <button
              type="button"
              class="px-3 py-1 rounded text-sm text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              on:click={handleSelectToday}
            >
              Today
            </button>
          </div>
        {/if}
      </div>
    {/if}
  </div>
  
  {#if hasError}
    <p id={`${id}-error`} class={`${helperSizeClasses[size]} text-red-500`}>
      {errorMessage}
    </p>
  {:else if helperText}
    <p id={`${id}-helper`} class={`${helperSizeClasses[size]} text-muted-foreground`}>
      {helperText}
    </p>
  {/if}
</div> 