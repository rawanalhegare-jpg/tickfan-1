import { Route, Switch } from "wouter";

function Home() {
  return (
    <div style={{padding: "40px", fontFamily: "Arial"}}>
      <h1>TickFan</h1>
      <p>Welcome to TickFan platform</p>
    </div>
  );
}

function About() {
  return (
    <div style={{padding: "40px", fontFamily: "Arial"}}>
      <h1>About</h1>
      <p>This is the TickFan platform.</p>
    </div>
  );
}

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </Switch>
  );
}
