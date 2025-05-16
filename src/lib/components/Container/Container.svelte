<script lang="ts">
  import type { ContainerProps } from './types.js';
  
  type $$Props = ContainerProps;
  
  export let maxWidth: $$Props['maxWidth'] = 'xl';
  export let center: $$Props['center'] = true;
  export let px: $$Props['px'] = 4;
  export let py: $$Props['py'] = 0;
  
  let className = '';
  export { className as class };
  
  // Max width mapping
  const maxWidthClasses = {
    none: '',
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };
  
  // Compute classes
  $: maxWidthClass = maxWidth ? maxWidthClasses[maxWidth] : '';
  $: centerClass = center ? 'mx-auto' : '';
  $: paddingClass = `px-${px} py-${py}`;
  
  // Combine all classes
  $: allClasses = [
    maxWidthClass,
    centerClass,
    paddingClass,
    'w-full',
    className,
  ].filter(Boolean).join(' ');
</script>

<div class={allClasses} {...$$restProps}>
  <slot />
</div> 