import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";

const required = (value) => value && value.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

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
        <CardImg
          top
          src={`http://localhost:3001/${dish.image}`}
          alt={dish.name}
        />
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
                  <CommentForm
                    dishId={props.dish.id}
                    addComment={props.addComment}
                  />
                </CardBody>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </>
      ) : (
        <div className="row">
          {props.isLoading && <Loading />}
          {props.err && <h4>{props.err}</h4>}
        </div>
      )}
    </div>
  );
};

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentForm: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.RenderComments = this.RenderComments.bind(this);
  }

  handleSubmit = (values) => {
    this.props.addComment(
      this.props.dishId,
      values.rating || 1,
      values.name,
      values.comment
    );
  };

  RenderComments = () => {
    this.setState({
      commentForm: !this.state.commentForm,
    });
  };

  render() {
    return (
      <>
        <Button outline onClick={this.RenderComments}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.commentForm} toggle={this.RenderComments}>
          <ModalHeader toggle={this.RenderComments}>Comment</ModalHeader>
          <ModalBody>
            <LocalForm
              onSubmit={(values) => this.handleSubmit(values)}
              className="m-3"
            >
              <Row className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  model=".rating"
                  className="form-control"
                  id="rating"
                  name="rating"
                >
                  <option selected="true">1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name">Your Name</Label>
                <Control.text
                  model=".name"
                  className="form-control"
                  id="name"
                  name="name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    required: "Required ",
                    minLength: "Must be greater than 2 characters ",
                    maxLength: "Must be less than 15 characters",
                  }}
                />
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  model=".comment"
                  className="form-control"
                  id="comment"
                  name="comment"
                  rows="6"
                  validators={{
                    required,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".comment"
                  show="touched"
                  messages={{
                    required: "Required ",
                  }}
                />
              </Row>
              <Row className="form-group">
                <Button type="submit" value="submit" color="primary">
                  Submit
                </Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default DishdetailComponent;
