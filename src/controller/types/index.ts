/***
 * Basic JSON response for Controllers
 */

export type BasicResponse = {
  message: string;
};

/**
 * Error JSON response for Controllers
 */

export type ErrorResponse = {
  error: string;
  message: string;
};

/***
 * JSON response with date for Controllers
 */

export type ResponseWithDate = BasicResponse & {
  date: string;
};
