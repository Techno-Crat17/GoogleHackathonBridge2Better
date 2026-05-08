import os

def replace_in_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'Bridge2Better' in content or 'Bridge2Better' in content or 'bridge2better' in content or 'bridge2better' in content:
            new_content = content.replace('Bridge2Better', 'Bridge2Better')
            new_content = new_content.replace('Bridge2Better', 'Bridge2Better')
            new_content = new_content.replace('bridge2better', 'bridge2better')
            new_content = new_content.replace('bridge2better', 'bridge2better')
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {file_path}")
    except Exception as e:
        print(f"Failed to process {file_path}: {e}")

def main():
    root_dir = r"d:\googlehackthon"
    exclude_dirs = {"node_modules", ".next", ".venv", "venv", "__pycache__", ".git"}
    
    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            if file.endswith(('.ts', '.tsx', '.py', '.md', '.json', '.yml', '.yaml', '.html', '.css')):
                replace_in_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
