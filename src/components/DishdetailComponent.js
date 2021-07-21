import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function formatDate(dateTime) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = dateTime.split("T")[0].split("-");
  const month = months[date[1] - 1];
  const day = date[2];
  const year = date[0];
  return `${month} ${day}, ${year}`;
}

function renderComments(comments) {
  return comments.map((comment) => {
    return (
      <li key={comment.id}>
        <p>{comment.comment}</p>
        <p>
          -- {comment.author}, {formatDate(comment.date)}
        </p>
      </li>
    );
  });
}

function renderDish(dish) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
const DishdetailComponent = (props) => {
  return (
    <div className="container">
      {props.dish ? (
        <>
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
            </div>
          </div>
          <div className="row">
            {renderDish(props.dish)}
            {props.comments.length > 0 ? (
              <div className="col-xs-12 col-sm-12 col-md-5 m-1">
                <CardBody>
                  <CardTitle>Comments</CardTitle>
                  <ul className="list-unstyled">
                    {renderComments(props.comments)}
                  </ul>
                </CardBody>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DishdetailComponent;
