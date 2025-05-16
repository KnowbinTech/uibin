<script lang="ts">
  import type { CardDescriptionProps } from './types.js';

  type $$Props = CardDescriptionProps;

  let className = '';
  export { className as class };

  // Generate combined classes
  $: descriptionClasses = [
    'text-sm text-muted-foreground',
    className
  ].filter(Boolean).join(' ');
</script>

<p class={descriptionClasses} {...$$restProps}>
  <slot></slot>
</p> 