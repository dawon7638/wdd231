# Guitar Gear Explorer — WDD231 reference implementation

## Setup
1. Place the `final` directory inside your `wdd231` repository.
2. Replace `YOUR-USERNAME` in HTML Open Graph URLs with your GitHub username.
3. Replace `Site Author` with your name.
4. Replace the demonstration video URL in every footer with your public 3–5 minute video.
5. Update the `Final` link on the WDD231 course homepage.
6. Verify product information and document external sources in `attributions.html`.
7. Run the official audit, Lighthouse, and mobile/browser tests before submitting.

## Testing
Fetch requests generally require an HTTP server rather than `file://`. From the directory containing `final`, run `python3 -m http.server 8000`, then visit `http://localhost:8000/final/`.

## Notes
This implementation intentionally uses CSS and SVG instead of product photography to keep pages lightweight. SVG preview may not render on every social platform; for broader compatibility export it to an optimized 1200×630 JPEG/PNG and update the og:image tags. The form uses GET for educational demonstration, so do not submit private information. Review and adapt all code yourself for your individual assignment.
