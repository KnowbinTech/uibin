<script lang="ts">
  import type { StackProps } from './types.js';
  
  type $$Props = StackProps;
  
  export let direction: $$Props['direction'] = 'vertical';
  export let space: $$Props['space'] = 4;
  export let align: $$Props['align'] = undefined;
  export let justify: $$Props['justify'] = undefined;
  export let wrap: $$Props['wrap'] = false;
  export let reverse: $$Props['reverse'] = false;
  export let smSpace: $$Props['smSpace'] = undefined;
  export let mdSpace: $$Props['mdSpace'] = undefined;
  export let lgSpace: $$Props['lgSpace'] = undefined;
  export let xlSpace: $$Props['xlSpace'] = undefined;
  export let smDirection: $$Props['smDirection'] = undefined;
  export let mdDirection: $$Props['mdDirection'] = undefined;
  export let lgDirection: $$Props['lgDirection'] = undefined;
  export let xlDirection: $$Props['xlDirection'] = undefined;
  export let dividers: $$Props['dividers'] = false;
  
  let className = '';
  export { className as class };
  
  // Direction classes
  $: flexDirection = (() => {
    const isHorizontal = direction === 'horizontal';
    const baseDirection = isHorizontal 
      ? reverse ? 'row-reverse' : 'row'
      : reverse ? 'column-reverse' : 'column';
    return `flex-${baseDirection}`;
  })();
  
  // Responsive direction classes
  $: responsiveDirections = [
    smDirection && `sm:flex-${smDirection === 'horizontal' ? (reverse ? 'row-reverse' : 'row') : (reverse ? 'column-reverse' : 'column')}`,
    mdDirection && `md:flex-${mdDirection === 'horizontal' ? (reverse ? 'row-reverse' : 'row') : (reverse ? 'column-reverse' : 'column')}`,
    lgDirection && `lg:flex-${lgDirection === 'horizontal' ? (reverse ? 'row-reverse' : 'row') : (reverse ? 'column-reverse' : 'column')}`,
    xlDirection && `xl:flex-${xlDirection === 'horizontal' ? (reverse ? 'row-reverse' : 'row') : (reverse ? 'column-reverse' : 'column')}`,
  ].filter(Boolean).join(' ');
  
  // Space classes
  $: spaceClass = (() => {
    const isHorizontal = direction === 'horizontal';
    return isHorizontal ? `space-x-${space}` : `space-y-${space}`;
  })();
  
  // Responsive space classes
  $: responsiveSpaces = [
    smSpace !== undefined && (smDirection === 'horizontal' || (smDirection === undefined && direction === 'horizontal')) 
      ? `sm:space-x-${smSpace}` 
      : smSpace !== undefined ? `sm:space-y-${smSpace}` : '',
    mdSpace !== undefined && (mdDirection === 'horizontal' || (mdDirection === undefined && direction === 'horizontal')) 
      ? `md:space-x-${mdSpace}` 
      : mdSpace !== undefined ? `md:space-y-${mdSpace}` : '',
    lgSpace !== undefined && (lgDirection === 'horizontal' || (lgDirection === undefined && direction === 'horizontal')) 
      ? `lg:space-x-${lgSpace}` 
      : lgSpace !== undefined ? `lg:space-y-${lgSpace}` : '',
    xlSpace !== undefined && (xlDirection === 'horizontal' || (xlDirection === undefined && direction === 'horizontal')) 
      ? `xl:space-x-${xlSpace}` 
      : xlSpace !== undefined ? `xl:space-y-${xlSpace}` : '',
  ].filter(Boolean).join(' ');
  
  // Alignment and justification
  $: alignClass = align ? `items-${align}` : '';
  $: justifyClass = justify ? `justify-${justify}` : '';
  
  // Wrap class
  $: wrapClass = wrap && direction === 'horizontal' ? 'flex-wrap' : '';
  
  // Divider class
  $: dividerClass = dividers ? 'divide-y divide-border' : '';
  
  // Combine all classes
  $: allClasses = [
    'flex',
    flexDirection,
    responsiveDirections,
    spaceClass,
    responsiveSpaces,
    alignClass,
    justifyClass,
    wrapClass,
    dividerClass,
    className,
  ].filter(Boolean).join(' ');
</script>

<div class={allClasses} {...$$restProps}>
  <slot />
</div> 