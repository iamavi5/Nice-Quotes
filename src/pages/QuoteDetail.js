import React,{useEffect} from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";



const QuoteDetail = () => {
  const params = useParams();
  const {quoteId} = params;

  const {sendRequest, status, error,data:loadedQuote} = useHttp(getSingleQuote,true);

  const match = useRouteMatch();
  //console.log(match);

  useEffect(()=>{
    sendRequest(quoteId);
  },[sendRequest,quoteId]);

  if(status==='pending'){
    return (<div className="centered">
        <LoadingSpinner />
    </div>);
  }

  if(error){
    return (<div className="centered">{error}</div>);
  }

  if (!loadedQuote.text) {
    return <p>No quote found</p>;
  }

  return (
    <React.Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </React.Fragment>
  );
};

export default QuoteDetail;
