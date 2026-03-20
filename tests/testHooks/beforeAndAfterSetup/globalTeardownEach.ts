//test.afterEach(
async function globalTeardownEach() {
    console.log("Global teardown each executed");
    // You can perform any global teardown tasks here, such as closing databases, cleaning up resources, etc.
}

export default globalTeardownEach;