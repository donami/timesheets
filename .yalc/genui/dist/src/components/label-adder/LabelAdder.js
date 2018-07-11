// import * as React from 'react';
// // import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import Icon from './Icon';
// const Container = styled.div`
//   border: #ccc 1px solid;
//   padding: 5px;
//   margin-bottom: 10px;
// `;
// const Input = styled.input`
//   border: none;
//   outline: none;
// `;
// const LabelList = styled.div``;
// const Label = ({ text, onRemove, className }) => (
//   <div className={className}>
//     <span>{text}</span>
//     <a onClick={onRemove}>
//       <Icon name="fas fa-times" />
//     </a>
//   </div>
// );
// Label.propTypes = {
//   text: PropTypes.string.isRequired,
//   onRemove: PropTypes.func.isRequired,
//   className: PropTypes.string,
// };
// Label.defaultProps = {
//   className: '',
// };
// const StyledLabel = styled(Label)`
//   font-size: 0.8rem;
//   display: inline-block;
//   background: #eee;
//   padding: 6px;
//   margin-right: 10px;
//   margin-bottom: 10px;
//   border-radius: 3px;
//   span {
//     margin-right: 10px;
//   }
//   a {
//     cursor: pointer;
//     &:hover {
//       opacity: 0.5;
//     }
//   }
// `;
// class LabelAdder extends React.Component {
//   static propTypes = {
//     onChange: PropTypes.func,
//     labels: PropTypes.arrayOf(PropTypes.string).isRequired,
//     placeholder: PropTypes.string,
//   };
//   static defaultProps = {
//     onChange: () => {},
//     placeholder: 'Add new label here...',
//   };
//   /**
//    * Event handler for adding a label
//    * Dispatches the onChange prop function with the updated label list
//    */
//   handleAdd = e => {
//     e.preventDefault();
//     const label = this.inputElem.value;
//     this.props.onChange(this.props.labels.concat(label));
//     this.inputElem.value = '';
//   };
//   /**
//    * Event handler for removing a label
//    */
//   handleRemove = index => {
//     const newLabels = [...this.props.labels.slice(0, index), ...this.props.labels.slice(index + 1)];
//     this.props.onChange(newLabels);
//   };
//   render() {
//     return (
//       <Container>
//         <LabelList>
//           {this.props.labels.map((label, key) => (
//             <StyledLabel text={label} key={key} onRemove={() => this.handleRemove(key)} />
//           ))}
//         </LabelList>
//         <form onSubmit={this.handleAdd}>
//           <Input
//             innerRef={input => {
//               this.inputElem = input;
//             }}
//             placeholder={this.props.placeholder}
//           />
//         </form>
//       </Container>
//     );
//   }
// }
// export default LabelAdder;
//# sourceMappingURL=LabelAdder.js.map