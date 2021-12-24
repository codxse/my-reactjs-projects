import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {fromEvent, merge, mapTo, interval, timer, takeUntil, startWith, throttleTime, switchMapTo} from 'rxjs';

const move$ = fromEvent(window, 'mousemove');
const down$ = fromEvent(window, 'mousedown');
const up$ = fromEvent(window, 'mouseup');
const keydown$ = fromEvent(window, 'keydown');
const keypress$ = fromEvent(window, 'keypress');
const keyup$ = fromEvent(window, 'keyup');

const activity$ = merge(
  move$.pipe(mapTo('Mouse Move!')),
  down$.pipe(mapTo('Mose Down!')),
  up$.pipe(mapTo('Mouse Up!')),
  keydown$.pipe(mapTo('Key Down!')),
  keypress$.pipe(mapTo('Key Press!')),
  keyup$.pipe(mapTo('Key Up!'))
)

const MAX_IDLE_TIME = 10
const THROTTLE_MS = 0
const maxIdleTime$ = timer(MAX_IDLE_TIME * 1000)

const newTimer = () => interval(1000).pipe(
  takeUntil(maxIdleTime$)
)

const events$ = activity$.pipe(
  startWith("START!"),
  throttleTime(THROTTLE_MS)
)

const idle$ = events$.pipe(
  switchMapTo(newTimer())
)

function App() {

  const [str, setString] = useState('')

  useEffect(() => {
    const subscription = idle$.subscribe((val: number) => {
      const sec = val + 1
      setString(`${sec}`)
      if (sec === MAX_IDLE_TIME-1) {
        // TODO: Logout Function here
        setString('LOGOUT!!')
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{str}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
