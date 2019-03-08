import React, { Component } from 'reactn';
import { Grid, Image, Container, Card, Button } from 'semantic-ui-react'

export default class MultiBlog extends Component {

  render() {
    return (
        <Container>
            <Grid stackable columns={1}>
                <Grid.Column>
                    <Card>
                        <Card.Content>
                            <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' />
                            <Card.Header>Steve Sanders</Card.Header>
                            <Card.Meta>Friends of Elliot</Card.Meta>
                            <Card.Description>
                            Steve wants to add you to the group <strong>best friends</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                            <Button basic color='green'>
                                Approve
                            </Button>
                            <Button basic color='red'>
                                Decline
                            </Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        </Container>
    );
  }
}
