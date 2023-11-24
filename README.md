# Task Manager REST API

This RESTful API provides endpoints for managing tasks.

## Usage

### Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.

### Available Endpoints

- `GET /tasks`: Retrieves all tasks.
- `GET /tasks/:id`: Retrieves a specific task by ID.
- `POST /tasks`: Adds a new task.
- `POST /tasks/:id`: Updates a task by ID.
- `DELETE /tasks/:id`: Deletes a task by ID.

### Endpoint Details

#### `GET /tasks`

Retrieves all tasks stored in the system.

- `status` (Optional): Filters tasks based on their status.
- #### Example GET /tasks?status=done

#### `GET /tasks/:id`

Retrieves a specific task by its unique ID.

#### `POST /tasks`

Adds a new task to the system. The request body should contain the new task data.

#### `POST /tasks/:id`

Updates an existing task based on its ID. The request body should contain the updated task data.

#### `DELETE /tasks/:id`

Deletes a task based on its ID.

#### `GET /tasks/priority/:level`

This endpoint allows retrieval of tasks based on their priority level.

### Error Handling

- `404 Not Found`: Returned when attempting to access a non-existent task.
- `400 Bad Request`: Returned for malformed requests or duplicate entries.
- `200 OK`: Returned for successful operations.

### Data Format

Tasks are stored in a JSON format containing fields such as `name`, `id`, `created`, `description`, `due`, `type`, and `priority`.

## Running the Server

To start the server, run `npm start`.
