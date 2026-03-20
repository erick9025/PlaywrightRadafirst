//test.afterAll( 
async function globalTeardown() {
    console.log("Global teardown executed");
    // You can perform any global teardown tasks here, such as closing databases, cleaning up resources, etc.
}

export default globalTeardown;