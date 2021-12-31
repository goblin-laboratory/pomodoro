import React from 'react';
import Sound from 'react-native-sound';

const changePlayState = (sound, paused) => {
  if (paused) {
    sound.pause();
    sound.setCurrentTime(0.0);
  } else {
    sound.setNumberOfLoops(-1);
    sound.setCurrentTime(0.0);
    sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }
};

function release(sound) {
  sound.pause();
  sound.stop();
  sound.release();
}

function useRing({src, paused, volume = 1.0}) {
  const ref = React.useRef({volume});

  React.useEffect(() => {
    return () => {
      ref.current = {};
    };
  }, []);

  React.useEffect(() => {
    if (ref.current.sound) {
      release(ref.current.sound);
      ref.current.sound = null;
    }
    ref.current.src = src;
    const sound = new Sound(src, errMsg => {
      if (errMsg) {
        console.log('failed to load the sound', errMsg);
        ref.current.sound = null;
        return;
      }
      if (src !== ref.current.src) {
        release(ref.current.sound);
        ref.current.sound = null;
        return;
      }
      ref.current.sound = sound;
      ref.current.sound.setVolume(ref.current.volume);
      changePlayState(ref.current.sound, ref.current.paused);
    });
  }, [src]);

  React.useEffect(() => {
    ref.current.volume = volume;
    if (ref.current.sound) {
      ref.current.sound.setVolume(volume);
    }
  }, [volume]);

  React.useEffect(() => {
    ref.current.paused = paused;
    if (!ref.current.sound) {
      return;
    }
    changePlayState(ref.current.sound, paused);
  }, [paused]);
}

export default useRing;
