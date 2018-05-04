import * as allActions from "./allActions";

export function receiveToilets(data) {
  return { type: allActions.RECEIVE_TOILETS, toilets: data };
}

export function fetchToilets() {
  return dispatch => {
    fetch("https://toilets.freska.io/toilets")
      .then(response =>
        response.json().then(data => ({
          data: data,
          status: response.status
        }))
      )
      .then(response => {
        if (response.status === 200) {
          dispatch(receiveToilets(response.data));
        } else {
          var flash = {
            type: "error",
            title: "Error getting toilets list",
            content:
              "There was an error getting the toilets list. Please try again."
          };
          dispatch({ type: "DISPLAY_FLASH", data: flash });
        }
      });
  };
}
