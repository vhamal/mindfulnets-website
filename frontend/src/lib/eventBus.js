import EventBus from "vertx3-eventbus-client";

const eventBus = new EventBus(`${process.env.BACKEND_URL}/eventbus`);

EventBus.handlerBundles = [];
eventBus.registerHandlersOnOpen = handlerBundle => EventBus.handlerBundles.push(handlerBundle);
eventBus.onopen = () => {
  EventBus.handlerBundles.forEach(handlerBundle => handlerBundle());
};

eventBus.onerror = e => console.error("Event bus error", e);

export default eventBus;
