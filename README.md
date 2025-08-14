# Todo List App

A simple, accessible, and responsive **Todo List** application built with **TypeScript**, **HTML**, and **CSS**.  
It supports adding, editing, deleting, and filtering tasks, with a modal confirmation before deletion.

## ✨ Features
- ➕ **Add** tasks  
- ✏️ **Edit** existing tasks  
- ❌ **Delete** tasks with modal confirmation  
- ✅ Mark tasks as complete/incomplete  
- 🔍 Filter by **All**, **Active**, or **Completed**  
- 💾 Persistent storage with **localStorage**    
- 🎨 Clean, responsive UI

## 🛠 Tech Stack
- **TypeScript**
- **HTML**
- **CSS**

## 📂 Folder Structure
```
└── dist/
└── src
|   └── styles.css
|   └── filters.ts
|   └── handleEdit.ts
|   └── index.ts
|   └── modal.ts
|   └── render.ts
|   └── state.ts
|   └── storage.ts
|   └── todos.ts
|   └── types.ts
|   └── util
└── index.html
└── tsconfig.json
```
- dist/ # Compiled JavaScript files
- src/ # TypeScript source files
- src/styles/ # CSS styles
- index.html # Main HTML entry point

## 🚀 Getting Started

### 1️⃣ Clone the repository
```git clone https://github.com/sertanrdn/Todo-List.git```
```cd Todo-List```

### 2️⃣ Install dependencies

(Only if you have a package.json with dependencies)

```npm install```

### 3️⃣ Compile TypeScript
```tsc --watch```

### 4️⃣ Run the app

Open ```index.html``` in your browser, or use Live Server in VS Code.

## 📖 Usage
Enter a task in the input box and click Add.
Use the Edit button to update a task.
Click Delete to open a modal confirmation before removing a task.
Filter tasks by All, Active, or Completed.
Your tasks are saved automatically in your browser.

## 🎨 Styling
Consistent theme defined with CSS variables
Responsive layout
Button hover states and transitions
Accessible modal design with animations

## 📜 License
This project is licensed under the MIT License.
