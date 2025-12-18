import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def run_verification():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    # Enable logging
    chrome_options.set_capability('goog:loggingPrefs', { 'browser':'ALL' })

    driver = webdriver.Chrome(options=chrome_options)
    driver.set_page_load_timeout(60)
    driver.set_script_timeout(60)

    try:
        print("Navigating to page...")
        driver.get("http://localhost:5173")
        time.sleep(10)  # Wait for initial load

        print("Executing script...")
        # Execute script to force "end" state and then "forgive"
        driver.execute_script("""
            const store = window.useStore.getState();
            store.setComplete();
            store.forgive();
        """)

        print("Waiting for animation...")
        time.sleep(5) # Wait for state update and animations

        # Verify state
        state = driver.execute_script("return window.useStore.getState()")
        print(f"State: isComplete={state['isComplete']}, hasForgiven={state['hasForgiven']}")

        # Capture screenshot
        print("Taking screenshot...")
        driver.save_screenshot("/home/jules/verification/celebration_verification.png")
        print("Screenshot saved.")

        # Print logs
        print("Browser Logs:")
        for entry in driver.get_log('browser'):
            print(entry)

    except Exception as e:
        print(f"Error: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    run_verification()
