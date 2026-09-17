import { test, expect, request } from "@playwright/test";

test("API-GetMethod", async ({ request }) => {
  const response = await request.get("/booking");
  console.log(response);
  console.log(response.status());
  console.log(response.statusText());
  const body = await response.json();
  console.log(body);
  //   console.log(await response.body());
});

let bookingId: number;

test("API-PostMethod", async ({ request }) => {
  const response = await request.post("/booking", {
    headers: { "Content-Type": "application/json" },
    data: {
      firstname: "Mohanapriya",
      lastname: "T",
      totalprice: 1000,
      depositpaid: false,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-02",
      },
      additionalneeds: "I need Coffee at 8AM",
    },
  });
  console.log(response);
  console.log(response.status());
  console.log(response.statusText());
  const postbody = await response.json();
  console.log(postbody);
  //   console.log(await response.body());
  expect(response.status()).toBe(200);
  bookingId = postbody.bookingid;
  expect(response.statusText()).toBe("OK");
  expect(postbody.bookingid).toBeDefined();
  expect(postbody.bookingid).toBeGreaterThan(0);
  expect(postbody.booking.firstname).toBe("Mohanapriya");
  expect(postbody.booking.bookingdates.checkout).toBe("2019-01-02");

  expect(typeof postbody.bookingid).toBe("number");
  expect(typeof postbody.booking.firstname).toBe("string");
  expect(typeof postbody.booking.bookingdates).toBe("object");

  const respHeaders = await response.headers();
  console.log(respHeaders);

  expect(respHeaders["content-type"]).toContain("application/json");
  const getRespo = await request.get(`/booking/${bookingId}`);
  const getbody = await getRespo.json();
  console.log(getRespo.status());
  console.log(getRespo.statusText());
  console.log(getbody);
});

test("PUT Method", async ({ request }) => {
  const response = await request.post("/booking", {
    headers: { "Content-Type": "application/json" },
    data: {
      firstname: "Mohanapriya",
      lastname: "T",
      totalprice: 1000,
      depositpaid: false,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-02",
      },
      additionalneeds: "I need Coffee at 8AM",
    },
  });
  console.log(response);
  console.log(response.status());
  console.log(response.statusText());
  const postbody = await response.json();
  console.log(postbody);
  //   console.log(await response.body());
  expect(response.status()).toBe(200);
  const bookingId = postbody.bookingid;
  // -----------Auth Code-----------

  const authresponse = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      headers: { "Content-Type": "application/json" },
      data: {
        username: "admin",
        password: "password123",
      },
    },
  );
  const authcode = authresponse.status();
  console.log(authcode);
  const authbody = await authresponse.json();
  const token = authbody.token;
  console.log(token);

  const putresponse = await request.put(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      data: {
        firstname: "MohanapriyaUpdated",
        lastname: "T-Updated",
        totalprice: 1000,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-02",
        },
        additionalneeds: "I need Coffee at 8AM",
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
    },
  );

  const statusCode = putresponse.status();
  console.log(statusCode);
});

test.describe("group of API request", () => {
  test.describe.configure({ mode: "serial" });
  // --------------POST METHOD ----------------
  let bookingId1: number;
  test("postmethod", async ({ request }) => {
    const response = await request.post("/booking", {
      headers: { "Content-Type": "application/json" },
      data: {
        firstname: "Mohanapriya",
        lastname: "T",
        totalprice: 1000,
        depositpaid: false,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-02",
        },
        additionalneeds: "I need Coffee at 8AM",
      },
    });
    console.log(response);
    console.log(response.status());
    console.log(response.statusText());
    const postbody = await response.json();
    console.log(postbody);
    //   console.log(await response.body());
    expect(response.status()).toBe(200);
    bookingId1 = postbody.bookingid;
  });

  // --------------Auth METHOD ----------------

  let token: string;
  test("authmethod", async ({ request }) => {
    const authresponse = await request.post(
      "https://restful-booker.herokuapp.com/auth",
      {
        headers: { "Content-Type": "application/json" },
        data: {
          username: "admin",
          password: "password123",
        },
      },
    );
    const authcode = authresponse.status();
    console.log(authcode);
    const authbody = await authresponse.json();
    token = authbody.token;
    console.log(token);
  });

  // -------------PUT METHOD  ---------------

  test("putmethod", async ({ request }) => {
    const putresponse = await request.put(
      `https://restful-booker.herokuapp.com/booking/${bookingId1}`,
      {
        data: {
          firstname: "MohanapriyaUpdated",
          lastname: "T-Updated",
          totalprice: 1000,
          depositpaid: true,
          bookingdates: {
            checkin: "2018-01-01",
            checkout: "2019-01-02",
          },
          additionalneeds: "I need Coffee at 8AM",
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: `token=${token}`,
        },
      },
    );

    const statusCode = putresponse.status();
    console.log(statusCode);
    const putbody = await putresponse.json();
    console.log(putbody);
  });
});

test("UI and API testing", async ({ page, context }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.fill("#email", "trends.06208@gmail.com");
  await page.fill("#password", "Trensa@06208");
  await page.click("#login-btn");
  await page.waitForURL("https://eventhub.rahulshettyacademy.com/");
  await context.storageState({ path: "auth.json" });
  const authfile = "auth.json";

  const jwtToken = await page.localStorage.getItem("eventhub_token");
  console.log(jwtToken);

  const apirequest = await request.newContext({
    baseURL: "https://api.eventhub.rahulshettyacademy.com",
    extraHTTPHeaders: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    storageState: authfile,
  });

  const postresponse = await apirequest.post("/api/events", {
    data: {
      title: "Tech Summit 2026",
      description: "A premier technology conference.",
      category: "Conference",
      venue: "Bangalore International Centre",
      city: "Bangalore",
      eventDate: "2026-09-17T09:00:00.000Z",
      price: 1500,
      totalSeats: 500,
      imageUrl: "https://example.com/banner.jpg",
    },
  });
  console.log(postresponse);
  const statusCode = await postresponse.status();
  console.log(statusCode);

  const postrespPayload = await postresponse.json();
  console.log(postrespPayload);
});


