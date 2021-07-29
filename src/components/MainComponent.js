import React, { Component } from "react";
import Menu from "./Menu";
import DishdetailComponent from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { connect } from "react-redux";
import {
  addComment,
  fetchComments,
  fetchDishes,
  fetchLeaders,
  fetchPromotions,
} from "../redux/actionCreators";
import { actions } from "react-redux-form";

const mapStoreToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchPromotions: () => dispatch(fetchPromotions()),

    addComment: (dishId, rating, author, comment) =>
      dispatch(addComment(dishId, rating, author, comment)),
    resetFeedbackForm: () => dispatch(actions.reset("feedback")),
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErr={this.props.dishes.err}
          promotionLoading={this.props.promotions.isLoading}
          promotionErrMsg={this.props.promotions.errMsg}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMsg={this.props.leaders.errMsg}
          leader={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
        />
      );
    };
    const AboutPage = () => {
      return <About leaders={this.props.leaders} />;
    };

    const DishWithId = ({ match }) => {
      return (
        <DishdetailComponent
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          err={this.props.dishes.err}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route path="/aboutus" component={AboutPage} />
          <Route
            exact
            path="/contactus"
            component={() => (
              <Contact resetForm={this.props.resetFeedbackForm} />
            )}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Main));
