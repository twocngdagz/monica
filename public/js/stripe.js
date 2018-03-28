/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/stripe.js":
/***/ (function(module, exports) {

eval("var elements = stripe.elements();\n\n// Custom styling can be passed to options when creating an Element.\n// (Note that this demo uses a wider set of styles than the guide below.)\nvar style = {\n  base: {\n    color: '#32325d',\n    lineHeight: '18px',\n    fontFamily: '\"Helvetica Neue\", Helvetica, sans-serif',\n    fontSmoothing: 'antialiased',\n    fontSize: '16px',\n    '::placeholder': {\n      color: '#aab7c4'\n    }\n  },\n  invalid: {\n    color: '#fa755a',\n    iconColor: '#fa755a'\n  }\n};\n\n// Create an instance of the card Element\nvar card = elements.create('card', {\n  hidePostalCode: true,\n  style: style\n});\n\n// Add an instance of the card Element into the `card-element` <div>\ncard.mount('#card-element');\n\n// Handle real-time validation errors from the card Element.\ncard.addEventListener('change', function (event) {\n  var displayError = document.getElementById('card-errors');\n  if (event.error) {\n    displayError.textContent = event.error.message;\n  } else {\n    displayError.textContent = '';\n  }\n});\n\n// Handle form submission\nvar form = document.getElementById('payment-form');\nform.addEventListener('submit', function (event) {\n  event.preventDefault();\n\n  var extraDetails = {\n    name: this.querySelector('input[name=cardholder-name]').value,\n    address_zip: this.querySelector('input[name=address-zip]').value\n  };\n\n  stripe.createToken(card, extraDetails).then(function (result) {\n    if (result.error) {\n      // Inform the user if there was an error\n      var errorElement = document.getElementById('card-errors');\n      errorElement.textContent = result.error.message;\n    } else {\n      // Send the token to your server\n      stripeTokenHandler(result.token);\n    }\n  });\n});\n\nfunction stripeTokenHandler(token) {\n  // Insert the token ID into the form so it gets submitted to the server\n  var form = document.getElementById('payment-form');\n  var hiddenInput = document.createElement('input');\n  hiddenInput.setAttribute('type', 'hidden');\n  hiddenInput.setAttribute('name', 'stripeToken');\n  hiddenInput.setAttribute('value', token.id);\n  form.appendChild(hiddenInput);\n\n  // Submit the form\n  form.submit();\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3N0cmlwZS5qcz80NWJhIl0sIm5hbWVzIjpbImVsZW1lbnRzIiwic3RyaXBlIiwic3R5bGUiLCJiYXNlIiwiY29sb3IiLCJsaW5lSGVpZ2h0IiwiZm9udEZhbWlseSIsImZvbnRTbW9vdGhpbmciLCJmb250U2l6ZSIsImludmFsaWQiLCJpY29uQ29sb3IiLCJjYXJkIiwiY3JlYXRlIiwiaGlkZVBvc3RhbENvZGUiLCJtb3VudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImRpc3BsYXlFcnJvciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlcnJvciIsInRleHRDb250ZW50IiwibWVzc2FnZSIsImZvcm0iLCJwcmV2ZW50RGVmYXVsdCIsImV4dHJhRGV0YWlscyIsIm5hbWUiLCJxdWVyeVNlbGVjdG9yIiwidmFsdWUiLCJhZGRyZXNzX3ppcCIsImNyZWF0ZVRva2VuIiwidGhlbiIsInJlc3VsdCIsImVycm9yRWxlbWVudCIsInN0cmlwZVRva2VuSGFuZGxlciIsInRva2VuIiwiaGlkZGVuSW5wdXQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiaWQiLCJhcHBlbmRDaGlsZCIsInN1Ym1pdCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSUEsV0FBV0MsT0FBT0QsUUFBUCxFQUFmOztBQUVBO0FBQ0E7QUFDQSxJQUFJRSxRQUFRO0FBQ1ZDLFFBQU07QUFDSkMsV0FBTyxTQURIO0FBRUpDLGdCQUFZLE1BRlI7QUFHSkMsZ0JBQVkseUNBSFI7QUFJSkMsbUJBQWUsYUFKWDtBQUtKQyxjQUFVLE1BTE47QUFNSixxQkFBaUI7QUFDZkosYUFBTztBQURRO0FBTmIsR0FESTtBQVdWSyxXQUFTO0FBQ1BMLFdBQU8sU0FEQTtBQUVQTSxlQUFXO0FBRko7QUFYQyxDQUFaOztBQWlCQTtBQUNBLElBQUlDLE9BQU9YLFNBQVNZLE1BQVQsQ0FBZ0IsTUFBaEIsRUFBd0I7QUFDakNDLGtCQUFnQixJQURpQjtBQUVqQ1gsU0FBT0E7QUFGMEIsQ0FBeEIsQ0FBWDs7QUFLQTtBQUNBUyxLQUFLRyxLQUFMLENBQVcsZUFBWDs7QUFFQTtBQUNBSCxLQUFLSSxnQkFBTCxDQUFzQixRQUF0QixFQUFnQyxVQUFTQyxLQUFULEVBQWdCO0FBQzlDLE1BQUlDLGVBQWVDLFNBQVNDLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBbkI7QUFDQSxNQUFJSCxNQUFNSSxLQUFWLEVBQWlCO0FBQ2ZILGlCQUFhSSxXQUFiLEdBQTJCTCxNQUFNSSxLQUFOLENBQVlFLE9BQXZDO0FBQ0QsR0FGRCxNQUVPO0FBQ0xMLGlCQUFhSSxXQUFiLEdBQTJCLEVBQTNCO0FBQ0Q7QUFDRixDQVBEOztBQVNBO0FBQ0EsSUFBSUUsT0FBT0wsU0FBU0MsY0FBVCxDQUF3QixjQUF4QixDQUFYO0FBQ0FJLEtBQUtSLGdCQUFMLENBQXNCLFFBQXRCLEVBQWdDLFVBQVNDLEtBQVQsRUFBZ0I7QUFDOUNBLFFBQU1RLGNBQU47O0FBRUEsTUFBSUMsZUFBZTtBQUNqQkMsVUFBTSxLQUFLQyxhQUFMLENBQW1CLDZCQUFuQixFQUFrREMsS0FEdkM7QUFFakJDLGlCQUFhLEtBQUtGLGFBQUwsQ0FBbUIseUJBQW5CLEVBQThDQztBQUYxQyxHQUFuQjs7QUFLQTNCLFNBQU82QixXQUFQLENBQW1CbkIsSUFBbkIsRUFBeUJjLFlBQXpCLEVBQXVDTSxJQUF2QyxDQUE0QyxVQUFTQyxNQUFULEVBQWlCO0FBQzNELFFBQUlBLE9BQU9aLEtBQVgsRUFBa0I7QUFDaEI7QUFDQSxVQUFJYSxlQUFlZixTQUFTQyxjQUFULENBQXdCLGFBQXhCLENBQW5CO0FBQ0FjLG1CQUFhWixXQUFiLEdBQTJCVyxPQUFPWixLQUFQLENBQWFFLE9BQXhDO0FBQ0QsS0FKRCxNQUlPO0FBQ0w7QUFDQVkseUJBQW1CRixPQUFPRyxLQUExQjtBQUNEO0FBQ0YsR0FURDtBQVVELENBbEJEOztBQW9CQSxTQUFTRCxrQkFBVCxDQUE0QkMsS0FBNUIsRUFBbUM7QUFDakM7QUFDQSxNQUFJWixPQUFPTCxTQUFTQyxjQUFULENBQXdCLGNBQXhCLENBQVg7QUFDQSxNQUFJaUIsY0FBY2xCLFNBQVNtQixhQUFULENBQXVCLE9BQXZCLENBQWxCO0FBQ0FELGNBQVlFLFlBQVosQ0FBeUIsTUFBekIsRUFBaUMsUUFBakM7QUFDQUYsY0FBWUUsWUFBWixDQUF5QixNQUF6QixFQUFpQyxhQUFqQztBQUNBRixjQUFZRSxZQUFaLENBQXlCLE9BQXpCLEVBQWtDSCxNQUFNSSxFQUF4QztBQUNBaEIsT0FBS2lCLFdBQUwsQ0FBaUJKLFdBQWpCOztBQUVBO0FBQ0FiLE9BQUtrQixNQUFMO0FBQ0QiLCJmaWxlIjoiLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3N0cmlwZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBlbGVtZW50cyA9IHN0cmlwZS5lbGVtZW50cygpO1xuXG4vLyBDdXN0b20gc3R5bGluZyBjYW4gYmUgcGFzc2VkIHRvIG9wdGlvbnMgd2hlbiBjcmVhdGluZyBhbiBFbGVtZW50LlxuLy8gKE5vdGUgdGhhdCB0aGlzIGRlbW8gdXNlcyBhIHdpZGVyIHNldCBvZiBzdHlsZXMgdGhhbiB0aGUgZ3VpZGUgYmVsb3cuKVxudmFyIHN0eWxlID0ge1xuICBiYXNlOiB7XG4gICAgY29sb3I6ICcjMzIzMjVkJyxcbiAgICBsaW5lSGVpZ2h0OiAnMThweCcsXG4gICAgZm9udEZhbWlseTogJ1wiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmJyxcbiAgICBmb250U21vb3RoaW5nOiAnYW50aWFsaWFzZWQnLFxuICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgJzo6cGxhY2Vob2xkZXInOiB7XG4gICAgICBjb2xvcjogJyNhYWI3YzQnXG4gICAgfVxuICB9LFxuICBpbnZhbGlkOiB7XG4gICAgY29sb3I6ICcjZmE3NTVhJyxcbiAgICBpY29uQ29sb3I6ICcjZmE3NTVhJ1xuICB9XG59O1xuXG4vLyBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgRWxlbWVudFxudmFyIGNhcmQgPSBlbGVtZW50cy5jcmVhdGUoJ2NhcmQnLCB7XG4gIGhpZGVQb3N0YWxDb2RlOiB0cnVlLFxuICBzdHlsZTogc3R5bGVcbn0pO1xuXG4vLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgRWxlbWVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpO1xuXG4vLyBIYW5kbGUgcmVhbC10aW1lIHZhbGlkYXRpb24gZXJyb3JzIGZyb20gdGhlIGNhcmQgRWxlbWVudC5cbmNhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgdmFyIGRpc3BsYXlFcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJkLWVycm9ycycpO1xuICBpZiAoZXZlbnQuZXJyb3IpIHtcbiAgICBkaXNwbGF5RXJyb3IudGV4dENvbnRlbnQgPSBldmVudC5lcnJvci5tZXNzYWdlO1xuICB9IGVsc2Uge1xuICAgIGRpc3BsYXlFcnJvci50ZXh0Q29udGVudCA9ICcnO1xuICB9XG59KTtcblxuLy8gSGFuZGxlIGZvcm0gc3VibWlzc2lvblxudmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGF5bWVudC1mb3JtJyk7XG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdmFyIGV4dHJhRGV0YWlscyA9IHtcbiAgICBuYW1lOiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9Y2FyZGhvbGRlci1uYW1lXScpLnZhbHVlLFxuICAgIGFkZHJlc3NfemlwOiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9YWRkcmVzcy16aXBdJykudmFsdWUsXG4gIH07XG5cbiAgc3RyaXBlLmNyZWF0ZVRva2VuKGNhcmQsIGV4dHJhRGV0YWlscykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAvLyBJbmZvcm0gdGhlIHVzZXIgaWYgdGhlcmUgd2FzIGFuIGVycm9yXG4gICAgICB2YXIgZXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcmQtZXJyb3JzJyk7XG4gICAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSByZXN1bHQuZXJyb3IubWVzc2FnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2VuZCB0aGUgdG9rZW4gdG8geW91ciBzZXJ2ZXJcbiAgICAgIHN0cmlwZVRva2VuSGFuZGxlcihyZXN1bHQudG9rZW4pO1xuICAgIH1cbiAgfSk7XG59KTtcblxuZnVuY3Rpb24gc3RyaXBlVG9rZW5IYW5kbGVyKHRva2VuKSB7XG4gIC8vIEluc2VydCB0aGUgdG9rZW4gSUQgaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gIHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BheW1lbnQtZm9ybScpO1xuICB2YXIgaGlkZGVuSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBoaWRkZW5JbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnaGlkZGVuJyk7XG4gIGhpZGRlbklucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsICdzdHJpcGVUb2tlbicpO1xuICBoaWRkZW5JbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdG9rZW4uaWQpO1xuICBmb3JtLmFwcGVuZENoaWxkKGhpZGRlbklucHV0KTtcblxuICAvLyBTdWJtaXQgdGhlIGZvcm1cbiAgZm9ybS5zdWJtaXQoKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc3RyaXBlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./resources/assets/js/stripe.js\n");

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/assets/js/stripe.js");


/***/ })

/******/ });