import React, { Component } from "reactn";
import {Link} from 'react-router-dom';
import Onboarding from './Onboarding';
import Header from '../Header';
import Loading from '../Loading';
import MultiBlog from '../MultiBlog';
import MigrationModal from './MigrationModal';
import {Header as SemanticHeader } from 'semantic-ui-react';
import { Container, Input, Grid, Popup, Button, Table, Icon, Modal } from 'semantic-ui-react';
const posts = require('../helpers/posts')

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      title: "",
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

  deleteModal = (props) =>{
    this.setState({ post: props, modalOpen: true, title: props.attrs.title })
  }

  deletePost = async (props) => {
    await posts.loadPostToDelete(props);
    this.setState({ modalOpen: false });
  }

  closeModal() {
    document.getElementsByClassName("modal")[0].style.display = "none";
  }

  render() {
    const { migrated, multiBlog, loading, onboardingComplete, filteredPosts, initialLoad  } = this.global;
    console.log(migrated)
    if(loading) {
      return (
        <Loading />
      )
    } else {
      if(initialLoad) {
        if(onboardingComplete) {
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
          } else if(!migrated) {
            return <MigrationModal />
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
                            if(post.attrs.status === "Published") {
                              statusButton = <Button style={{fontSize: "10px", cursor: "default"}} circular color='green'>P</Button>
                            } else {
                              statusButton = <Button style={{fontSize: "10px", cursor: "default"}} circular color='yellow'>D</Button>;
                            }
                          return(
                            <Table.Row key={post._id}>
                              <Table.Cell><Link to={'/posts/' + post._id}>{post.attrs.title.length > 30 ? post.attrs.title.substring(0,30)+"..." :  post.attrs.title}</Link></Table.Cell>
                              <Table.Cell>{post.attrs.author}</Table.Cell>
                              <Table.Cell>{post.attrs.lastUpdated}</Table.Cell>
                              <Table.Cell>{statusButton}</Table.Cell>
                              <Table.Cell>
                              <Modal open={this.state.modalOpen} trigger={
                                    <a onClick={() => this.deleteModal(post)}><Icon name='trash alternate outline' /></a>
                                  } basic size='small'>
                                    <SemanticHeader icon='trash alternate outline' content={this.state.title ? 'Delete ' + this.state.title + '?' : 'Delete document?'} />
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
                                            <Button onClick={() => this.deletePost(this.state.post)} color='red' inverted>
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
