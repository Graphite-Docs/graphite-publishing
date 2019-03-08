import React, { Component } from "reactn";
import {Link} from 'react-router-dom';
import Onboarding from './Onboarding';
import Header from '../Header';
import Loading from '../Loading';
import MultiBlog from '../MultiBlog';
import {Header as SemanticHeader } from 'semantic-ui-react';
import { Container, Input, Grid, Popup, Button, Table, Icon, Modal } from 'semantic-ui-react';
const posts = require('../helpers/posts')

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      modalOpen: false
    }
  }

  checkOnboarding = () => {
    console.log("checking")
    if(JSON.parse(localStorage.getItem('onboarding'))) {
      this.setState({ run: false, onboardingComplete: true})
    } else {
      this.setState({ run: true }, () => {
        localStorage.setItem('onboarding', JSON.stringify(true));
      })
    }
  }

  close() {
    window.$('.tap-target').tapTarget('close')
  }

  deleteModal = (props) =>{
    this.setState({ post: props, modalOpen: true })
  }

  closeModal() {
    document.getElementsByClassName("modal")[0].style.display = "none";
  }

  render() {
    const { multiBlog, loading, onboardingComplete, paymentDue, filteredPosts, initialLoad  } = this.global;
    if(loading) {
      return (
        <Loading />
      )
    } else {
      if(initialLoad) {
        if(onboardingComplete && !paymentDue) {
          return (
            <div>
                <Loading />
            </div>
          );
        } else {
          return (
            <Onboarding />
          )
        }
      } else {
        if(onboardingComplete) {
          if(multiBlog) {
            return(
              <MultiBlog />
            )    
          } else {
            return (
              <div>
                <Header />
                <Container style={{marginTop:"65px"}}>
                    <div>
                      <div>
                        <Grid stackable columns={2}>
                          <Grid.Column>
                            <h2><span style={{marginRight: "10px"}}>Posts ({filteredPosts.length})</span>
                              <Button onClick={posts.newPost} style={{marginLeft: "10px!important"}} secondary>New</Button>
                              {/*appliedFilter === false ? <span className="filter"><a onClick={() => this.setState({visible: true})} style={{fontSize:"16px", marginLeft: "10px", cursor: "pointer"}}>Filter<Icon name='caret down' /></a></span> : <span className="hide"><a>Filter</a></span>*/}
                              {/*appliedFilter === true ? <span className="filter"><Label style={{fontSize:"16px", marginLeft: "10px"}} as='a' basic color='grey' onClick={gdocs.clearFilter}>Clear</Label></span> : <div />*/}
                            </h2>
                          </Grid.Column>
                          <Grid.Column>
                            <Input onChange={posts.filterList} icon='search' placeholder='Search...' />
                          </Grid.Column>
                        </Grid>
    
                        <Table unstackable style={{borderRadius: "0"}}>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell style={{borderRadius: "0", border: "none"}}>Title</Table.HeaderCell>
                              <Table.HeaderCell style={{borderRadius: "0", border: "none"}}>Author</Table.HeaderCell>
                              <Table.HeaderCell style={{borderRadius: "0", border: "none"}}>Date</Table.HeaderCell>
                              <Popup trigger={
                                <Table.HeaderCell style={{borderRadius: "0", border: "none"}}>Status</Table.HeaderCell>
                                } 
                                content='P = Published, D = Draft' 
                              />
                              <Table.HeaderCell style={{borderRadius: "0", border: "none"}}></Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                        {
                          filteredPosts.map(post => {
                            let statusButton;
                            if(post.status === "Published") {
                              statusButton = "btn-floating center-align btn-small waves-effect waves-light green darken-2";
                            } else {
                              statusButton = "btn-floating center-align btn-small waves-effect waves-light yellow accent-4";
                            }
                          return(
                            <Table.Row key={post.id}>
                              <Table.Cell><Link to={'/post/' + post.id}>{post.title.length > 30 ? post.title.substring(0,30)+"..." :  post.title}</Link></Table.Cell>
                              <Table.Cell>{post.author}</Table.Cell>
                              <Table.Cell>{post.createdDate}</Table.Cell>
                              <Table.Cell><p className={statusButton}>{post.status.charAt(0)}</p></Table.Cell>
                              <Table.Cell>
                              <Modal open={this.state.modalOpen} trigger={
                                    <a onClick={() => this.deleteModal(post)}><Icon name='trash alternate outline' /></a>
                                  } basic size='small'>
                                    <SemanticHeader icon='trash alternate outline' content={this.state.post.title ? 'Delete ' + this.state.post.title + '?' : 'Delete document?'} />
                                    <Modal.Content>
                                      <p>
                                        The post cannot be restored.
                                      </p>
                                    </Modal.Content>
                                    <Modal.Actions>
                                      <div>
                                          <div>
                                            <Button onClick={() => this.setState({ modalOpen: false })} basic color='red' inverted>
                                              <Icon name='remove' /> No
                                            </Button>
                                            <Button onClick={() => posts.loadPostToDelete(this.state.post)} color='red' inverted>
                                              <Icon name='checkmark' /> Delete
                                            </Button>
                                          </div>
                                      </div>
                                    </Modal.Actions>
                                </Modal>
                              </Table.Cell>
                            </Table.Row>
                          );
                          })
                        }
                        </Table.Body>
                      </Table>
                      </div>
                    </div>
                  
                  </Container>
              </div>
            );
          }
        } else {
          return (
            <Onboarding />
          )
        }
      }
    }
  }
}
