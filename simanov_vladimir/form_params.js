function FormParamsObject(params){
	this.params = params;
	this.getObjectProperty = function(param){
		console.log(this.parseStringToParam(param));
	};

	this.setObjectProperty = function(param,value){
		if(typeof param == 'string' && param.length > 1){
			let params_arr = param.split('.');
			let temp_param = getByKeyFromParam(this.params,params_arr,0,params_arr.length);
			if(typeof temp_param == 'object' && temp_param != null)temp_param[params_arr[params_arr.length - 1]] = value;
		}

	};

	this.convertObjectToArray = function(param){
		if(typeof param == 'string' && param.length > 1){
			let params_arr = param.split('.');
			let temp_param = getByKeyFromParam(this.params,params_arr,0,params_arr.length);
			let temp_param_obj = {};
			let new_object = [];
			temp_param_obj = temp_param[params_arr[params_arr.length - 1]];
			for(key in temp_param_obj)	{
				for(elem_key in temp_param_obj[key]){
					if(new_object[elem_key] == undefined) new_object[elem_key] = {};
					new_object[elem_key][key] = temp_param_obj[key][elem_key];
				}

			}

			temp_param[params_arr[params_arr.length - 1]] = new_object;
		}
	};

	this.getFullObject = function(){
		console.log(this.params);
	};

	this.parseStringToParam = function(str_param){
		if(typeof str_param == 'string' && str_param.length > 1){
			let params_arr = str_param.split('.');
			let param_value = '';
			if(typeof params_arr == 'object'){
				param_value = getValFromParam(this.params,params_arr,0,params_arr.length,'value');
				return param_value;
			} else { 
				let param_value = this.params[params_arr];
				if(param_value != undefined) return param_value;
				else return null;
			}
		}else return null;
	}
}

function getValFromParam(param,array,i,length){
	let iter_param_value = param[array[i]];	
	if(iter_param_value != undefined){
		if(i < length - 1){
			i++;
			return getValFromParam(iter_param_value,array,i,length);
		} else { 
			return iter_param_value;
		}
	} else return null;
}

function getByKeyFromParam(param,array,i,length){
	let iter_param_value = param[array[i]];
	if(iter_param_value != undefined){
		if(i < length - 1){
			i++;
			return getByKeyFromParam(iter_param_value,array,i,length);
		} else { 
			return param;			
		}
	} else {
		
		if(array[i] == array[length - 1]){
			param[array[i]] = '';
			return param;
		} else {
			param[array[i]] = {};
			iter_param_value = param[array[i]];
			i++;
			return getByKeyFromParam(iter_param_value,array,i,length);
		}
	}
}