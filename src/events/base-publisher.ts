import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];
  private client: Stan;
  abstract onConnect(data: T["data"], msg: Message): void;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]) {
    this.client.publish(this.subject, data, () => {
      console.log("Event published.");
    });
  }
}
