<script lang="ts">
  import { onMount } from 'svelte';

  let eyeX = $state(0);
  let eyeY = $state(0);
  let catElement: HTMLDivElement;

  function handleMouseMove(event: MouseEvent) {
    if (!catElement) return;
    
    const rect = catElement.getBoundingClientRect();
    const catCenterX = rect.left + rect.width / 2;
    const catCenterY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(event.clientY - catCenterY, event.clientX - catCenterX);
    const distance = Math.min(3, Math.hypot(event.clientX - catCenterX, event.clientY - catCenterY) / 20);
    
    eyeX = Math.cos(angle) * distance;
    eyeY = Math.sin(angle) * distance;
  }
</script>

<svelte:window onmousemove={handleMouseMove} />

<div 
  bind:this={catElement}
  class="fixed bottom-8 right-8 w-16 h-16 z-50 transition-transform hover:scale-110 cursor-pointer"
  title="Meow!"
>
  <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-lg">
    <!-- Head -->
    <path d="M20 30 Q 10 10 40 10 Q 70 10 90 20 Q 95 50 80 80 Q 50 95 20 80 Q 5 50 20 30" fill="#333" />
    <!-- Ears -->
    <path d="M25 35 L 15 10 L 40 20" fill="#333" />
    <path d="M75 35 L 85 10 L 60 20" fill="#333" />
    
    <!-- Eyes -->
    <g transform="translate(35, 45)">
      <circle cx="0" cy="0" r="8" fill="white" />
      <circle cx={eyeX} cy={eyeY} r="3" fill="black" />
    </g>
    <g transform="translate(65, 45)">
      <circle cx="0" cy="0" r="8" fill="white" />
      <circle cx={eyeX} cy={eyeY} r="3" fill="black" />
    </g>
    
    <!-- Nose -->
    <path d="M45 55 L 55 55 L 50 62 Z" fill="pink" />
  </svg>
</div>
