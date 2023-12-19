// Get references to the video element and calculate its position
const adVideo: HTMLVideoElement | null = document.getElementById(
  "adVideo"
) as HTMLVideoElement;

// Function to check if an element is at least 50% in the viewport
export function isElementInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
  );
}

// Function to handle video play and stop based on visibility
export function handleVideoVisibility(adVideo: HTMLVideoElement) {
  if (adVideo) {
    const isVisible = isElementInViewport(adVideo);
    if (isVisible && adVideo.paused) {
      console.log("Video started playing.");
      adVideo.play();
    } else if (!isVisible && !adVideo.paused) {
      console.log("Video paused.");
      adVideo.pause();
    }
  }
}

// Event listener for scrolling to handle video visibility
window.addEventListener("scroll", () => {
  handleVideoVisibility(adVideo);
});

// Event listeners to track video progress
if (adVideo) {
  adVideo.addEventListener("timeupdate", () => {
    const currentTime = adVideo.currentTime;
    const duration = adVideo.duration;
    const percentage = parseInt(((currentTime / duration) * 100).toFixed());

    if (
      percentage === 25 ||
      percentage === 50 ||
      percentage === 75 ||
      percentage === 100
    ) {
      console.log(`Video played ${percentage}% of its duration.`);
    }
  });
}

// Check if the video is in view for at least 50% and 2 continuous seconds
let isInViewportForTwoSeconds = false;
let lastSeenTime: number | null = null;

window.addEventListener("scroll", () => {
  if (adVideo) {
    const isVisible = isElementInViewport(adVideo);
    if (isVisible) {
      if (!lastSeenTime) {
        lastSeenTime = Date.now();
      }
      const currentTime = Date.now();
      if (currentTime - lastSeenTime >= 2000 && isElementInViewport(adVideo)) {
        isInViewportForTwoSeconds = true;
        console.log(
          "Ad is in the viewport for at least 50% and 2 continuous seconds."
        );
      }
    } else {
      isInViewportForTwoSeconds = false;
      lastSeenTime = null;
    }
  }
});
