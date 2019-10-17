import React, { Component } from 'react'
import AmpUserState from '../amp/AmpUserState'
import { Hbox, Vbox } from 'react-storefront/Box'
import CartButton from 'react-storefront/CartButton'

export default class AmpHeaderButtons extends Component {
  render() {
    return (
      <div style={{ position: 'relative', height: 65, width: 92 }}>
        <AmpUserState url="/user.json" ampListProps={{ layout: 'fill' }}>
          <>
            <Hbox>
              <div style={{ position: 'relative' }}>
                <CartButton label="Cart" />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 48,
                    height: 48,
                    color: 'white'
                  }}
                >
                  {'{{itemsInCart}}'}
                </div>
              </div>
              <Vbox alignItems="center">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 2,
                    width: 20,
                    height: 20,
                    border: '1px solid #333',
                    borderRadius: '50%'
                  }}
                >
                  {'{{firstInitial}}'}
                </div>
                <div style={{ fontSize: '12px' }}>
                  {'{{#signedIn}}'}
                  <span>Account</span>
                  {'{{/signedIn}}'}
                  {'{{^signedIn}}'}
                  <span>sign in</span>
                  {'{{/signedIn}}'}
                </div>
              </Vbox>
            </Hbox>
          </>
        </AmpUserState>
      </div>
    )
  }
}
