<script lang="ts">
  import type { DividerProps } from './types.js';

  type $$Props = DividerProps;

  export let orientation: $$Props['orientation'] = 'horizontal';
  export let weight: $$Props['weight'] = 'medium';
  export let withLabel: $$Props['withLabel'] = false;
  export let color: $$Props['color'] = undefined;
  export let style: $$Props['style'] = 'solid';

  let className = '';
  export { className as class };

  // Generate weight classes
  $: weightClasses = {
    thin: orientation === 'horizontal' ? 'h-px' : 'w-px',
    medium: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
    thick: orientation === 'horizontal' ? 'h-1' : 'w-1'
  };

  // Generate style classes
  $: styleClasses = {
    solid: 'border-0',
    dashed: 'border-0 border-dashed',
    dotted: 'border-0 border-dotted'
  };

  // Generate combined classes
  $: dividerClasses = [
    // Base styles
    'bg-border',
    
    // Weight
    weight ? weightClasses[weight] : weightClasses.medium,
    
    // Style
    style ? styleClasses[style] : styleClasses.solid,
    
    // Orientation
    orientation === 'vertical' ? 'h-full inline-block' : 'w-full',
    
    // With label (for horizontal dividers only)
    withLabel && orientation === 'horizontal' ? 'flex items-center' : '',
    
    // Custom classes
    className
  ].filter(Boolean).join(' ');

  // Generate inline styles
  $: dividerStyles = color ? `background-color: ${color};` : '';
</script>

{#if orientation === 'horizontal' && withLabel}
  <div class={dividerClasses} role="separator" aria-orientation={orientation} style={dividerStyles} {...$$restProps}>
    <span class="flex-grow h-px bg-border"></span>
    <span class="px-2 text-xs text-muted-foreground">
      <slot></slot>
    </span>
    <span class="flex-grow h-px bg-border"></span>
  </div>
{:else}
  <hr class={dividerClasses} role="separator" aria-orientation={orientation} style={dividerStyles} {...$$restProps} />
{/if} 