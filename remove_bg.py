import sys
import os

input_path = r"C:\Users\santh\.gemini\antigravity\brain\a1b4bb74-c855-444e-a9e1-4c8dd2bb02d2\.user_uploaded\media_1786553170832.png"
output_path = r"c:\Users\santh\OneDrive\Documents\Desktop\axisEngineering\axis_engineering\public\images\worker_transparent.png"

os.makedirs(os.path.dirname(output_path), exist_ok=True)

try:
    from rembg import remove
    from PIL import Image

    print(f"Reading input image: {input_path}")
    input_image = Image.open(input_path)
    print("Processing background removal with rembg AI...")
    output_image = remove(input_image)
    print(f"Saving output image: {output_path}")
    output_image.save(output_path, "PNG")
    print("SUCCESS")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
