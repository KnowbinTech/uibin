<script lang="ts">
  import { radius } from '../../theme/index.js';
  import type { BoxProps } from './types.js';
  
  type $$Props = BoxProps;
  
  export let as: $$Props['as'] = 'div';
  export let p: $$Props['p'] = undefined;
  export let px: $$Props['px'] = undefined;
  export let py: $$Props['py'] = undefined;
  export let pt: $$Props['pt'] = undefined;
  export let pr: $$Props['pr'] = undefined;
  export let pb: $$Props['pb'] = undefined;
  export let pl: $$Props['pl'] = undefined;
  export let m: $$Props['m'] = undefined;
  export let mx: $$Props['mx'] = undefined;
  export let my: $$Props['my'] = undefined;
  export let mt: $$Props['mt'] = undefined;
  export let mr: $$Props['mr'] = undefined;
  export let mb: $$Props['mb'] = undefined;
  export let ml: $$Props['ml'] = undefined;
  export let rounded: $$Props['rounded'] = undefined;
  export let bg: $$Props['bg'] = undefined;
  export let color: $$Props['color'] = undefined;
  export let shadow: $$Props['shadow'] = undefined;
  export let border: $$Props['border'] = undefined;
  
  let className = '';
  export { className as class };
  
  // Helper function to handle spacing
  function getSpacingClass(size: number | undefined, property: string): string {
    if (size === undefined) return '';
    return `${property}-${size}`;
  }
  
  // Compute padding classes
  $: paddingClasses = [
    p !== undefined ? `p-${p}` : '',
    px !== undefined ? `px-${px}` : '',
    py !== undefined ? `py-${py}` : '',
    pt !== undefined ? `pt-${pt}` : '',
    pr !== undefined ? `pr-${pr}` : '',
    pb !== undefined ? `pb-${pb}` : '',
    pl !== undefined ? `pl-${pl}` : '',
  ].filter(Boolean).join(' ');
  
  // Compute margin classes
  $: marginClasses = [
    m !== undefined ? `m-${m}` : '',
    mx !== undefined ? `mx-${mx}` : '',
    my !== undefined ? `my-${my}` : '',
    mt !== undefined ? `mt-${mt}` : '',
    mr !== undefined ? `mr-${mr}` : '',
    mb !== undefined ? `mb-${mb}` : '',
    ml !== undefined ? `ml-${ml}` : '',
  ].filter(Boolean).join(' ');
  
  // Compute border radius classes
  $: roundedClass = (() => {
    if (rounded === undefined) return '';
    if (rounded === true) return 'rounded';
    if (rounded === false) return '';
    return `rounded-${String(rounded)}`;
  })();
  
  // Compute background color
  $: bgClass = bg ? `bg-${bg}` : '';
  
  // Compute text color
  $: colorClass = color ? `text-${color}` : '';
  
  // Compute shadow
  $: shadowClass = (() => {
    if (shadow === undefined) return '';
    if (shadow === true) return 'shadow';
    if (shadow === false) return '';
    return `shadow-${shadow}`;
  })();
  
  // Compute border
  $: borderClass = border ? 'border border-border' : '';
  
  // Combine all classes
  $: allClasses = [
    paddingClasses,
    marginClasses,
    roundedClass,
    bgClass,
    colorClass,
    shadowClass,
    borderClass,
    className,
  ].filter(Boolean).join(' ');
</script>

<svelte:element this={as} class={allClasses} {...$$restProps}>
  <slot />
</svelte:element> 