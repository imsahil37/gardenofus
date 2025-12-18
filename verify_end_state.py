from playwright.sync_api import sync_playwright
import time
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        try:
            page.goto("http://localhost:5173", timeout=30000)
        except Exception as e:
            print(f"Error navigating: {e}")
            return

        # Wait for the canvas to be present (app loaded)
        try:
            page.wait_for_selector("canvas", timeout=10000)
        except Exception:
            print("Canvas not found")
            return

        # Inject state to force completion
        time.sleep(2)

        page.evaluate("""
            if (window.useStore) {
                window.useStore.getState().setComplete()
            }
        """)

        # Wait for potential animations
        time.sleep(5)

        # Hide the overlay container to see the scene
        page.evaluate("""
            const headings = Array.from(document.querySelectorAll('h1'));
            const heading = headings.find(h => h.textContent.includes("I'm so sorry"));
            if (heading) {
                // Hide the parent container of the heading
                heading.closest('div').style.display = 'none';
            }
        """)

        # Wait a bit for layout update (instant for display:none but good measure)
        time.sleep(1)

        # Take screenshot of the end state
        output_path = os.path.join(os.getcwd(), "final_verification_end_state_clean.png")
        page.screenshot(path=output_path)
        print(f"Screenshot taken at {output_path}")

        browser.close()

if __name__ == "__main__":
    run()
