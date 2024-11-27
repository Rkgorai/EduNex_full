import os
import subprocess
import platform

def run_command_in_new_terminal(command, directory):
    os_name = platform.system()
    if os_name == "Windows":
        # Use `start` to open a new terminal on Windows
        subprocess.Popen(f'start cmd /k "cd {directory} && {command}"', shell=True)
    elif os_name in ["Linux", "Darwin"]:  # Linux and macOS (Darwin)
        terminal_command = "gnome-terminal -- bash -c" if os_name == "Linux" else "open -a Terminal"
        full_command = f'{terminal_command} "cd {directory} && {command}; exec bash"'
        subprocess.Popen(full_command, shell=True)
    else:
        raise OSError("Unsupported operating system!")

# Paths to your backend and frontend folders
backend_dir = "backend"
frontend_dir = "frontend"

# Commands to run
backend_command = "python app.py"
frontend_command = "npm run dev"

# Run the commands
try:
    run_command_in_new_terminal(backend_command, backend_dir)
    run_command_in_new_terminal(frontend_command, frontend_dir)
except OSError as e:
    print(f"Error: {e}")
