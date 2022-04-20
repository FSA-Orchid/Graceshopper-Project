import React from 'react'
import {AllProductsPaged } from './AllProducts'
import ReactPaginate from 'react-paginate'
import { connect } from "react-redux";

class Pagination extends React.Component {
  constructor() {
    super()
    this.state = {
      pageCount: 1,
      itemOffset: 0,
      currentItems: [],
      initialPage: 1,
      itemsPerPage: 10,
    }
    this.handlePageClick = this.handlePageClick.bind(this)
  }

  componentDidMount () {
    const endOffset = this.state.itemOffset + this.state.itemsPerPage
   this.setState({
     currentItems: this.props.items.slice(this.state.itemOffset, endOffset),
     pageCount: Math.ceil((this.props.items.length)/this.state.itemsPerPage)
   })
  }
  componentDidUpdate(prevProps) {
    const endOffset = this.state.itemOffset + this.state.itemsPerPage
    if (prevProps.items!== this.props.items) {
      this.setState({
        currentItems: this.props.items.slice(this.state.itemOffset, endOffset)|| [],
      });
    }
  }

  handlePageClick (event) {
    const newOffset = (event.selected * this.state.itemsPerPage) % this.props.items.length
    this.setState({
     currentItems: this.props.items.slice(newOffset, (newOffset+ this.state.itemsPerPage)),
      itemOffset: newOffset
    })

  }

 render() {
   return (
    <div>
      <AllProductsPaged products={this.state.currentItems} />
      <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={this.handlePageClick}
      pageRangeDisplayed={5}
      pageCount={this.state.pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
    </div>

   )
 }

}

const mapStateProduct = (state) => {
  return {items: state.products}
}

export const Product = connect(mapStateProduct)(Pagination)
