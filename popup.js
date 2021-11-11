// sliders' nodes
const speedSlider = document.getElementById('speed-slider');
const volumeSlider = document.getElementById('volume-slider');

// sliders' texts
const speedText = document.getElementById('speed-text');
const volumeText = document.getElementById('volume-text');

const updateSpeed = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => {
        const video = document.getElementsByTagName('video')[0];

        return video.playbackRate;
      },
    },
    // update the slider text and value based on the values got from the video
    (speed) => {
      document.getElementById('speed-text').textContent = speed[0].result;
      document.getElementById('speed-slider').value = speed[0].result;
    }
  );
};
updateSpeed();

const updateVolume = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => {
        const video = document.getElementsByTagName('video')[0];

        return video.volume;
      },
    },
    // update the slider text and value based on the values got from the video
    (volume) => {
      document.getElementById('volume-text').textContent = Math.round(
        volume[0].result * 100
      );
      document.getElementById('volume-slider').value = volume[0].result;
    }
  );
};
updateVolume();

speedSlider.addEventListener('input', async (e) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: setVideoPlaybackSpeed,
    args: [e.target.value],
  });

  updateSpeed();
});

volumeSlider.addEventListener('input', async (e) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setVideoVolume,
    args: [e.target.value],
  });

  updateVolume();
});

const setVideoPlaybackSpeed = (speed) => {
  const video = document.getElementsByTagName('video')[0];

  video.playbackRate = speed;
};

const setVideoVolume = (volume) => {
  const video = document.getElementsByTagName('video')[0];

  video.volume = volume;
};
