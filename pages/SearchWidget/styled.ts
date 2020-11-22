import styled from "styled-components";

export const Suggestion = styled.div<{ highlight: boolean }>`
  padding: 10px;
  border-bottom: 1px solid grey;
  background-color: ${(props) => props.highlight? "grey" : "white"};

  &:hover {
    background-color: grey;
    cursor: pointer;
  }
`;

export const getSearchStyles = () => {
  return {
    container: {
      margin: "10px",
      alignSelf: "flex-end",
      position: "relative",
    },
    containerOpen: {},
    input: {
      backgroundColor: "white",
      padding: "10px",
      borderRadius: "20px",
      border: "1px solid grey",
      outline: "none",
      width: "300px",
      
    },
    inputOpen: {
      //backgroundColor: "grey",
    },
    inputFocused: {
      backgroundColor: "white",
      border: "1px solid white",
      boxShadow: "0px 0px 23px 0px rgba(179,179,179,1)",
      outline: "none",
    },
    suggestionsContainer: {
      boxShadow: "0px 0px 23px 0px rgba(179,179,179,1)",
      maxHeight: "200px",
      overflowY: "scroll",
      position: "absolute",
      zIndex: "100",
      margin: "10px 20px",
      width: "calc(100% - 40px)",
    },
    suggestionsContainerOpen: {
      
    },
    suggestionsList: {
      listStyleType: "none",
      margin: "0",
      padding: "0",
    },
    suggestion: {
      backgroundColor: "red",
      "&:lastChild": {
        borderBottom: "none",
      },
    },
    suggestionFirst: {
      backgroundColor: "blue",
    },
    suggestionHighlighted: {
      backgroundColor: "red",
    },
    sectionContainer: {
      backgroundColor: "green",
    },
    sectionContainerFirst: {
      backgroundColor: "violet",
    },
    sectionTitle: {
      backgroundColor: "grey",
    },
  };
};