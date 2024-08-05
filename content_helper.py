import tkinter as tk
from tkinter import filedialog, simpledialog, messagebox
import json
import os
import shutil

class ImageDataGenerator:
    def __init__(self, root):
        self.root = root
        self.root.title("Image Data Generator")
        self.root.geometry("400x300")
        self.data = []
        self.images_folder = 'images'
        self.data_folder = 'data'
        self.data_file = 'data.json'
        self.data_path = os.path.join(self.data_folder, self.data_file)
        self.counter_file = 'counter.txt'
        self.counter = self.load_counter()

        self.label = tk.Label(root, text="Select an image file to add.")
        self.label.pack(pady=20)

        self.add_button = tk.Button(root, text="Select Image File", command=self.add_image_data)
        self.add_button.pack(pady=10)

        # Load existing data
        self.load_data()

    def load_counter(self):
        """Load the counter value from a file, or initialize it if it does not exist."""
        if os.path.exists(self.counter_file):
            with open(self.counter_file, 'r') as f:
                return int(f.read().strip())
        return 1

    def save_counter(self):
        """Save the current counter value to a file."""
        with open(self.counter_file, 'w') as f:
            f.write(str(self.counter))

    def load_data(self):
        if os.path.exists(self.data_path):
            with open(self.data_path, 'r') as f:
                self.data = json.load(f)

    def add_image_data(self):
        file_path = filedialog.askopenfilename(filetypes=[("Image Files", "*.jpg;*.jpeg;*.png")])
        if file_path:
            self.process_image(file_path)

    def generate_unique_name(self):
        """Generate a unique name for the image using a counter."""
        return f"image_{self.counter}.jpg"  # Change extension as needed

    def process_image(self, image_src):
        # Ensure the images folder exists
        if not os.path.exists(self.images_folder):
            os.makedirs(self.images_folder)

        # Generate a unique name for the image
        unique_image_name = self.generate_unique_name()
        new_image_path = os.path.join(self.images_folder, unique_image_name)

        # Move and rename the image to the images folder
        shutil.copy(image_src, new_image_path)  # Use copy() to avoid removing the original file

        # Increment and save the counter
        self.counter += 1
        self.save_counter()

        # Prompt for text and link details
        text = simpledialog.askstring("Input", "Description Text:")
        link_href = simpledialog.askstring("Input", "Learn More Link URL:")

        if text and link_href:
            item = {
                "imageSrc": new_image_path,  # Update path to new location
                "text": text,
                "linkHref": link_href
            }
            # Add new item to the top of the list
            self.data.insert(0, item)
            self.save_to_json()
            self.label.config(text=f"Image '{unique_image_name}' added.")
        else:
            messagebox.showwarning("Input Error", "Both description text and link URL are required.")

    def save_to_json(self):
        # Save the updated data to the JSON file
        if not os.path.exists(self.data_folder):
            os.makedirs(self.data_folder)

        with open(self.data_path, 'w') as f:
            json.dump(self.data, f, indent=4)
        messagebox.showinfo("Info", "Data saved to data.json")

if __name__ == "__main__":
    root = tk.Tk()
    app = ImageDataGenerator(root)
    root.mainloop()
