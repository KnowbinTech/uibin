<script lang="ts">
  import type { GridProps } from './types.js';
  
  type $$Props = GridProps;
  
  export let cols: $$Props['cols'] = 12;
  export let gap: $$Props['gap'] = 4;
  export let gapX: $$Props['gapX'] = undefined;
  export let gapY: $$Props['gapY'] = undefined;
  export let smCols: $$Props['smCols'] = undefined;
  export let mdCols: $$Props['mdCols'] = undefined;
  export let lgCols: $$Props['lgCols'] = undefined;
  export let xlCols: $$Props['xlCols'] = undefined;
  export let xxlCols: $$Props['xxlCols'] = undefined;
  export let flow: $$Props['flow'] = 'row';
  export let autoFit: $$Props['autoFit'] = false;
  export let minColWidth: $$Props['minColWidth'] = '250px';
  
  let className = '';
  export { className as class };
  
  // Calculate CSS grid columns based on cols number or 'none'
  $: columnsClass = (() => {
    if (cols === 'none') return '';
    if (autoFit) return 'grid-cols-auto-fit';
    return `grid-cols-${cols}`;
  })();
  
  // Calculate responsive columns classes
  $: responsiveClasses = [
    smCols && smCols !== 'none' ? `sm:grid-cols-${smCols}` : '',
    mdCols && mdCols !== 'none' ? `md:grid-cols-${mdCols}` : '',
    lgCols && lgCols !== 'none' ? `lg:grid-cols-${lgCols}` : '',
    xlCols && xlCols !== 'none' ? `xl:grid-cols-${xlCols}` : '',
    xxlCols && xxlCols !== 'none' ? `2xl:grid-cols-${xxlCols}` : '',
  ].filter(Boolean).join(' ');
  
  // Calculate gap classes
  $: gapClasses = (() => {
    if (gapX !== undefined && gapY !== undefined) {
      return `gap-x-${gapX} gap-y-${gapY}`;
    }
    return gap !== undefined ? `gap-${gap}` : '';
  })();
  
  // Calculate flow class
  $: flowClass = flow ? `grid-flow-${flow}` : '';
  
  // Combine all classes
  $: allClasses = [
    'grid',
    columnsClass,
    responsiveClasses,
    gapClasses,
    flowClass,
    className,
  ].filter(Boolean).join(' ');
  
  // Create auto-fit style if needed
  $: autoFitStyle = autoFit
    ? `grid-template-columns: repeat(auto-fit, minmax(${minColWidth}, 1fr));`
    : '';
</script>

<div class={allClasses} style={autoFitStyle} {...$$restProps}>
  <slot />
</div> 