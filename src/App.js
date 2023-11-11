import EventPlanner from "./controller/DecemberEventPlanner";

class App {
  async run() {
    const eventPlanner = new EventPlanner();
    await eventPlanner.eventStart();
  }
}

export default App;
