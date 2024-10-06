# LaundryProgress

**LaundryProgress** is a smart, AI-powered solution that helps users track the availability of laundry machines in real time. Built using the powerful **llama3-11b-vision** model, the application processes visual inputs to detect open laundry machines and provides up-to-date statuses.

## 🚀 Features

- **AI-Powered Machine Detection**: Utilizes llama3-11b-vision to process live images and detect available laundry machines.
- **Real-Time Updates**: Get live updates on the status of machines to avoid unnecessary trips.
- **User-Friendly Interface**: Simple and intuitive UI to monitor multiple machines at once.
- **Flexible Integration**: Easily integrate with external APIs for laundry management services.

## 🧰 Tech Stack

- **Backend**: Python, FastAPI
- **AI Model**: llama3-11b-vision Groq
- **Frontend**: React, Next.js
- **Database**: Supbabase
- **Cloud Hosting**: Vercel (API), Vercel (Frontend)

## 💡 How It Works

1. **Machine Monitoring**: The application relies on users to capture images of laundry machines.
2. **AI Processing**: llama3-11b-vision processes the images, detecting whether a machine is open or in use.
3. **Live Status Display**: The results are displayed on the frontend, showing available machines to users.
4. **External API Fetching**: You can integrate the app with APIs like `process.env.WASH_API_URL/machines/all` to fetch additional data about the laundry machines.

## 🌐 Live Demo

Check out the live demo: [LaundryProgress](https://laundryprogress.vercel.app)
- 
## 🛠️ Setup

1. Clone the repositories:
   ```bash
   git clone https://github.com/Sslithercode/laundryprogress.git
   git clone https://github.com/Sslithercode/laundry_api.git

2. Set enviornment variables
   either run the api on localhost and set WASH_API_URL to localhost or deploy it 
   set a groq api key

3. Run
    either npm run dev  for dev or deploy to Vercel

