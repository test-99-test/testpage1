// Weather effects control script
document.addEventListener('DOMContentLoaded', function() {
  // Initialize night sky background
  const nightContainer = document.querySelector('.night-container');
  
  // Create stars
  createStars();
  
  // Add wind effect indicator
  createWindEffect();
  
  // Add artistic shapes
  addArtisticShapes();
  
  // Initialize weather containers
  const rainContainer = document.querySelector('.rain-container');
  const snowContainer = document.querySelector('.snow-container');
  const snowGround = document.querySelector('.snow-ground');
  
  // Initialize interval variables
  let rainInterval;
  let snowInterval;
  
  // Wind direction and strength (changes over time)
  let windDirection = -20; // negative is left, positive is right
  let windStrength = 1;
  
  // Start the weather cycle
  let isRaining = true;
  startRaining();
  
  // Weather cycle control
  setInterval(() => {
    if (isRaining) {
      // Transition from rain to snow
      transitionToSnow();
    } else {
      // Transition from snow to rain
      transitionToRain();
    }
    isRaining = !isRaining;
  }, 20000); // Change weather every 20 seconds
  
  // Change wind direction and strength periodically
  setInterval(() => {
    // Gradually change wind direction
    const newDirection = Math.sin(Date.now() / 10000) * 30;
    windDirection = newDirection;
    
    // Vary wind strength
    windStrength = 0.5 + Math.abs(Math.sin(Date.now() / 15000)) * 2;
    
    // Update wind visual indicator
    updateWindIndicator();
  }, 2000);
  
  // Create wind visual effect
  function createWindEffect() {
    const windIndicator = document.createElement('div');
    windIndicator.classList.add('wind-indicator');
    nightContainer.appendChild(windIndicator);
  }
  
  // Update wind indicator based on current direction and strength
  function updateWindIndicator() {
    const windIndicator = document.querySelector('.wind-indicator');
    if (windIndicator) {
      // Adjust animation duration based on wind strength (faster = stronger wind)
      const duration = 20 / windStrength;
      windIndicator.style.animationDuration = `${duration}s`;
      
      // Adjust the angle of the gradient based on wind direction
      if (windDirection > 0) {
        windIndicator.style.transform = 'rotate(-5deg)';
      } else {
        windIndicator.style.transform = 'rotate(5deg)';
      }
    }
  }
  
  // Add artistic decorative shapes
  function addArtisticShapes() {
    // Add circles
    for (let i = 0; i < 5; i++) {
      const circle = document.createElement('div');
      circle.classList.add('artistic-shape', 'circle');
      
      // Random size
      const size = Math.random() * 100 + 50;
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      
      // Random position
      circle.style.left = `${Math.random() * 90}%`;
      circle.style.top = `${Math.random() * 80 + 10}%`;
      
      nightContainer.appendChild(circle);
    }
    
    // Add triangles
    for (let i = 0; i < 3; i++) {
      const triangle = document.createElement('div');
      triangle.classList.add('artistic-shape', 'triangle');
      
      // Random size
      const size = Math.random() * 80 + 40;
      triangle.style.width = `${size}px`;
      triangle.style.height = `${size}px`;
      
      // Random position
      triangle.style.left = `${Math.random() * 90}%`;
      triangle.style.top = `${Math.random() * 80 + 10}%`;
      
      nightContainer.appendChild(triangle);
    }
    
    // Add diamonds near content sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const diamond = document.createElement('div');
      diamond.classList.add('artistic-shape', 'diamond');
      
      // Size
      diamond.style.width = '30px';
      diamond.style.height = '30px';
      
      // Position relative to section
      const rect = section.getBoundingClientRect();
      diamond.style.left = `${rect.left - 20}px`;
      diamond.style.top = `${rect.top + 30}px`;
      
      document.body.appendChild(diamond);
    });
  }
  
  // Create stars in the night sky
  function createStars() {
    const stars = document.querySelector('.stars');
    const starsCount = 200;
    
    for (let i = 0; i < starsCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random star size
      const size = Math.random() * 3;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Random twinkle animation delay
      star.style.animationDelay = `${Math.random() * 3}s`;
      
      stars.appendChild(star);
    }
  }
  
  // Create raindrops and start raining
  function startRaining() {
    rainContainer.innerHTML = '';
    rainContainer.classList.add('weather-active');
    snowContainer.classList.remove('weather-active');
    
    const dropCount = 200;
    
    for (let i = 0; i < dropCount; i++) {
      setTimeout(() => {
        createRaindrop();
      }, i * 50);
    }
    
    // Start creating rain continuously
    rainInterval = setInterval(() => {
      createRaindrop();
    }, 100);
  }
  
  // Create a single raindrop
  function createRaindrop() {
    const drop = document.createElement('div');
    drop.classList.add('rain');
    
    // Random raindrop properties
    const width = Math.random() * 1 + 1;
    const height = Math.random() * 10 + 15;
    const left = Math.random() * 100;
    const duration = Math.random() * 0.5 + 0.7;
    
    drop.style.width = `${width}px`;
    drop.style.height = `${height}px`;
    drop.style.left = `${left}%`;
    drop.style.animationDuration = `${duration}s`;
    
    // Apply wind effect to angle of the rain
    const windAngle = windDirection * (windStrength / 2);
    drop.style.transform = `rotate(${windAngle}deg)`;
    
    rainContainer.appendChild(drop);
    
    // Create splash effect when raindrop hits ground
    setTimeout(() => {
      // Calculate where the drop will land accounting for wind
      const landingPosition = left + (windDirection * windStrength * (duration / 1.5));
      createSplash(landingPosition);
      drop.remove();
    }, duration * 1000);
  }
  
  // Create splash effect for raindrops
  function createSplash(left) {
    // Constrain splash position to within the viewport
    const constrainedLeft = Math.max(0, Math.min(100, left));
    
    const splash = document.createElement('div');
    splash.classList.add('splash');
    splash.style.left = `${constrainedLeft}%`;
    splash.style.bottom = '0';
    
    rainContainer.appendChild(splash);
    
    // Remove splash after animation completes
    setTimeout(() => {
      splash.remove();
    }, 500);
  }
  
  // Start snowing
  function startSnowing() {
    snowContainer.innerHTML = '';
    snowContainer.classList.add('weather-active');
    rainContainer.classList.remove('weather-active');
    
    // Reset snow ground height
    snowGround.style.height = '0';
    
    const snowflakeCount = 150;
    
    for (let i = 0; i < snowflakeCount; i++) {
      setTimeout(() => {
        createSnowflake();
      }, i * 100);
    }
    
    // Start creating snowflakes continuously
    snowInterval = setInterval(() => {
      createSnowflake();
    }, 200);
    
    // Gradually increase snow ground height
    setTimeout(() => {
      snowGround.style.height = '20px';
    }, 5000);
  }
  
  // Create a single snowflake
  function createSnowflake() {
    const flake = document.createElement('div');
    flake.classList.add('snow');
    
    // Random snowflake properties
    const size = Math.random() * 5 + 3;
    const left = Math.random() * 100;
    const duration = Math.random() * 5 + 8;
    
    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;
    flake.style.left = `${left}%`;
    flake.style.animationDuration = `${duration}s`;
    
    // Apply wind effect to the snowflake trajectory
    // Wind has more effect on snow than on rain
    const sway = windDirection * windStrength * 3;
    const customKeyframes = `
      @keyframes custom-snow-${Math.floor(Math.random() * 1000)} {
        0% {
          transform: translateY(-100px) translateX(0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 0.8;
          transform: translateY(-50px) translateX(${sway * 0.1}px) rotate(45deg);
        }
        40% {
          transform: translateY(calc(40vh - 100px)) translateX(${sway * 0.4}px) rotate(90deg);
        }
        60% {
          transform: translateY(calc(60vh - 100px)) translateX(${sway * 0.6}px) rotate(180deg);
        }
        90% {
          opacity: 0.8;
          transform: translateY(calc(90vh - 100px)) translateX(${sway * 0.9}px) rotate(360deg);
        }
        100% {
          transform: translateY(calc(100vh + 100px)) translateX(${sway}px) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    
    // Add the custom animation to the document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = customKeyframes;
    document.head.appendChild(styleSheet);
    
    // Apply the custom animation
    const animationName = styleSheet.sheet.cssRules[0].name;
    flake.style.animationName = animationName;
    
    snowContainer.appendChild(flake);
    
    // Remove snowflake and its style after animation completes
    setTimeout(() => {
      flake.remove();
      styleSheet.remove();
    }, duration * 1000);
  }
  
  // Transition from rain to snow
  function transitionToSnow() {
    clearInterval(rainInterval);
    startSnowing();
  }
  
  // Transition from snow to rain
  function transitionToRain() {
    clearInterval(snowInterval);
    
    // Melt snow on ground
    snowGround.style.height = '0';
    
    setTimeout(() => {
      startRaining();
    }, 1000);
  }
}); 