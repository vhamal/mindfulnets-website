import EventBus from "vertx3-eventbus-client";

export default new EventBus(`${process.env.BACKEND_URL}/eventbus`);
