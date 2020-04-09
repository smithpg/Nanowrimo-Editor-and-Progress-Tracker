import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import ReactDOM from "react-dom";
import Layout from "./layouts/main/main";
import EditorView from "./views/Editor";

function App() {
  let [user, setUser] = useState(null);

  useEffect(() => {
    // Attempt to fetch user data from backend
    fetch("http://localhost:3000/nanowrimo/api/user", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(parsed => setUser(parsed))
      .catch(error => console.log(error));
  }, []);

  return (
    <Layout>
      <header>
        <h1>NaNoWriMo</h1>
        <ul>
          <li>{user ? user.email : null}</li>
        </ul>
      </header>

      <Router>
        <Switch>
          <Route exact path={"/"}>
            <div className="ListView">
              <NewDocumentButton />
              <ul>
                {user &&
                  user.documents.map(doc => (
                    <DocumentListItem document={doc} key={doc.id} />
                  ))}
              </ul>
            </div>
          </Route>

          <Route path={"/editor/:documentId"}>
            <EditorView />
          </Route>
        </Switch>
      </Router>
    </Layout>
  );

  function DocumentListItem({ document }) {
    const history = useHistory();
    const style = {
      height: "300px",
      width: "200px",
      textAlign: "center",
      margin: "0.5rem",
      boxShadow: "1px 1px 3px rgba(0,0,0,0.4)",
      color: "black",
      padding: "5px 10px",
      cursor: "pointer"
    };
    function onClick(e) {
      history.push("/editor/" + document.id);
    }

    return (
      <li style={style} onClick={onClick}>
        <h1>{document.title}</h1>
        <p>{document.content}</p>
      </li>
    );
  }

  function NewDocumentButton() {
    const history = useHistory();

    function onClickNewDocument(e) {
      // Retrieve the document from the server
      fetch("http://localhost:3000/nanowrimo/api/document", {
        credentials: "include",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Untitled",
          content: ""
        })
      })
        .then(res => res.json())
        .then(parsed => {
          history.push("/editor/" + parsed.id);
        });
    }

    return (
      <div>
        <button onClick={onClickNewDocument}>New Document</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
