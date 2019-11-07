import React from 'react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { inject, observer } from 'mobx-react'

const getTitle = location => {
  const text = location.pathname.replace('/static/', '').replace(/-/g, ' ')

  return text.charAt(0).toUpperCase() + text.slice(1)
}

const styles = theme => ({
  root: {
    marginBottom: '200px'
  },
  titleRow: {
    margin: '35px 0 20px 0'
  },
  content: {
    fontSize: '16px',
    lineHeight: '1.4',
    color: theme.palette.dark
  }
})

const Static = inject('app')(
  observer(({ app, classes }) => (
    <Container className={classes.root}>
      <Row className={classes.titleRow}>
        <Typography variant="h3" component="h1">
          {getTitle(app.location)}
        </Typography>
      </Row>
      <Row className={classes.content}>
        <p>
          Vivamus a justo ut arcu lobortis mollis. Morbi laoreet est nisl, a lacinia tellus mattis
          in.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et viverra massa, nec
          ultricies nisl. Fusce fringilla malesuada maximus. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas. Nulla scelerisque ante sit amet
          eleifend molestie. Phasellus cursus dolor nibh, id fermentum nulla auctor molestie.
        </p>
        <p>
          Nulla facilisi. Curabitur tortor nunc, viverra sed viverra vitae, congue non elit. Morbi
          sit amet varius diam. Morbi luctus magna nec libero congue, sagittis pretium dui ornare.
          Ut neque nibh, dignissim non erat nec, gravida porta erat. Maecenas porttitor vestibulum
          volutpat. Praesent vitae magna diam. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Praesent tincidunt vel quam efficitur
          fringilla. Nulla non pulvinar neque, sit amet rhoncus risus.
        </p>
      </Row>
    </Container>
  ))
)

export default withStyles(styles)(Static)
