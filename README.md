Webservice App for Database Updates and Patches
This project is a webservice app that allows you to perform database updates and patches when sending emails to send an object to a specific email address.

Installation
To install the project, follow these steps:

Clone the repository to your local machine.
Install the required dependencies by running the following command: npm install.
Usage
To use the project, follow these steps:

Set up a MySQL database with the name database_name.

Create a .env file with the following contents:

GMAIL_CLIENT_ID=<your-gmail-client-id>
GMAIL_CLIENT_SECRET=<your-gmail-client-secret>
GMAIL_REFRESH_TOKEN=<your-gmail-refresh-token>
GMAIL_ACCESS_TOKEN=<your-gmail-access-token>

Replace <your-gmail-client-id>, <your-gmail-client-secret>, <your-gmail-refresh-token>, and <your-gmail-access-token> with your actual values. You can obtain these values by following the steps in the Gmail API Quickstart Guide.

Start the server by running the following command: npm start.

Send an email to <your-email-address> with a JSON object as the body. The object should have an id field and one or more fields to update in the projects table. For example:
{
"id": 1,
"name": "New Project Name",
"description": "New Project Description"
}

The server will update the projects table in the database_name database with the specified fields.
