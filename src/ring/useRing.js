import React from 'react';
import Sound from 'react-native-sound';

function release(sound) {
  sound.pause();
  sound.stop();
  sound.release();
}

function useRing({src, paused, volume = 1.0}) {
  const ref = React.useRef({volume});

  const play = React.useCallback(() => {
    if (!ref.current.src) {
      return;
    }
    const current = ref.current.src;
    const sound = new Sound(current, errMsg => {
      if (errMsg) {
        console.log('failed to load the sound', errMsg);
        ref.current.sound = null;
        return;
      }
      if (current !== ref.current.src) {
        release(sound);
        ref.current.sound = null;
        return;
      }
      ref.current.sound = sound;
      sound.setNumberOfLoops(-1);
      ref.current.sound.setVolume(ref.current.volume);
      if (!ref.current.paused) {
        sound.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
          release(sound);
          play();
        });
      }
      // sound.play(success => {
      //   if (success) {
      //     console.log('successfully finished playing');
      //   } else {
      //     console.log('playback failed due to audio decoding errors');
      //   }
      //   release(sound);
      //   play();
      // });
    });
  }, []);

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
    play();
  }, [src, play]);

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
    if (paused) {
      ref.current.sound.pause();
      ref.current.sound.setCurrentTime(0.0);
    } else {
      ref.current.sound.setCurrentTime(0.0);
      ref.current.sound.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
        if (ref.current.sound) {
          release(ref.current.sound);
        }
        play();
      });
    }
  }, [paused, play]);
}

export default useRing;
