import ReactTable from 'react-table';
import 'react-table/react-table.css';
import React,{Component} from 'react';

const columns = [
    {
        Header: 'Rank',
        accessor: 'rank',
    },
    {
    Header: 'Review Text',
    accessor: 'reviewtext',
    width:400,
    Cell: props=> <div style={{whiteSpace:'pre-wrap'}}>{props.value}</div>
}, {
    Header: 'Rating',
    accessor: 'rating',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
   }, {
        Header: 'Upvotes',
        accessor: 'upvotes' // String-based value accessors!
    },
    {
      Header :'Downvotes',
      accessor:'downvotes'
    },
    {
      Header: 'Helpfulness Index',
      accessor :'helpfulness'
    },
    {
      Header: 'Predicted Helpfulness Index',
      accessor: 'phelpindex'
    }

];

const defaultPSize=5;

export class MyTable extends Component{
    constructor(props){
        super(props);
        this.state={
            localData:[]
        }
    }

    componentDidMount(){
        let json= require('./data.json');

        json.sort((a,b)=>{
            return b.phelpindex-a.phelpindex;
        });

        let rankedJson=[];

        for(let i=0;i<json.length;i++){

           let obj={
               rating:json[i].rating,
               upvotes:json[i].upvotes,
               downvotes:json[i].downvotes,
               reviewtext: json[i].reviewtext,
               helpfulness: json[i].helpfulness,
               phelpindex: json[i].phelpindex,
               rank:i
           };
           rankedJson.push(obj);
        }

        this.setState({
            localData: rankedJson
        });
    }

    countWords=(s)=>{
        s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
        s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
        s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
        return s.split(' ').length;
    };

    count_u_word=(s)=>{
        s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
        s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
        s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
        return s.split(' ');
    };

    charCounter=(s)=>{
        let c=0;
        for(let i=0;i<s.length;i++){
            if((s.charAt(i)>=65 && c.charAt(i)<=90)||(s.charAt(i)>=97 && c.charAt(i)<=118)){
                c++;
            }
        }
        return c;
    };


    componentWillReceiveProps(nextProps){

        if((nextProps.modalData.submitclicked)===true) {
            let  newdata=[];

            for(let i=0;i<this.state.localData.length;i++){

                let localobj={
                    rating: this.state.localData[i].rating,
                    upvotes:  this.state.localData[i].upvotes,
                    downvotes:this.state.localData[i].downvotes,
                    reviewtext: this.state.localData[i].reviewtext,
                    helpfulness:this.state.localData[i].helpfulness,
                    phelpindex: this.state.localData[i].phelpindex
                };

                newdata.push(localobj);
            }

            let max_values_list=[26938, 21641, 5168, 1205, 197, 354.1012630014859, 5];

            let coeff_list=[0.29866856985740642, -3.2936309072163219, -2.0975154748221323, -0.24840780813661245,
                2.864413458669449, 1.2894638317549558, 1.3570455979916116, 0.37399572889757193];

            let reviewd= nextProps.modalData.reviewtext;


            let text_length = (reviewd.length/max_values_list[0]);

            let char_count = (this.charCounter(reviewd)/max_values_list[1]);

            let word_count= (this.countWords(reviewd)/max_values_list[2]);

            let unique_word_count= ((new Set(this.count_u_word(reviewd))).size/max_values_list[3]);

            let sent_count=0;

            if((reviewd.match(/\S.*?\."?(?=\s|$)/g))!==null) {
                sent_count= (((reviewd.match(/\S.*?\."?(?=\s|$)/g)).length)/max_values_list[4]);
            }
            else {
                sent_count=(1/max_values_list[4]);
            }

            let ari =((4.71*(this.charCounter(reviewd)/this.countWords(reviewd)) + 0.5*(this.countWords(reviewd)/(sent_count*max_values_list[4])))/max_values_list[5]);


            let rstars= (nextProps.modalData.rating/max_values_list[6]);

            let op= coeff_list[0]+coeff_list[1]*(text_length)+ coeff_list[2]*(char_count) + coeff_list[3]*(word_count)+
                      coeff_list[4]*(unique_word_count) + coeff_list[5]*(sent_count)+ coeff_list[6]*(ari)+ coeff_list[7]*(rstars) ;

            alert('This is Predicted Helpfulness Index Value'+op);
            console.log(op);

            let obj={
                rating: nextProps.modalData.rating,
                upvotes:  nextProps.modalData.upvotes,
                downvotes:nextProps.modalData.downvotes,
                reviewtext: nextProps.modalData.reviewtext,
                helpfulness:nextProps.modalData.upvotes/(nextProps.modalData.upvotes+nextProps.modalData.downvotes),
               // calculate this phelp index
                phelpindex: op
            };

            newdata.push(obj);

            newdata.sort((a,b)=>{
                return b.phelpindex-a.phelpindex;
            });

            let rankednewdata=[];

            console.log('New Length is    ',newdata.length);

            for(let i=0;i<newdata.length;i++){
                let obj={
                    rating: newdata[i].rating,
                    upvotes:  newdata[i].upvotes,
                    downvotes: newdata[i].downvotes,
                    reviewtext: newdata[i].reviewtext,
                    helpfulness: newdata[i].helpfulness,
                    phelpindex: newdata[i].phelpindex,
                    rank:i
                };
                rankednewdata.push(obj);
            }

            this.setState({
               localData: rankednewdata
            });
        }
    }

    render(){
     return(
         <ReactTable
         data={this.state.localData}
         columns={columns}
         defaultPageSize={defaultPSize}
         style={{overflow:'wrap'}}
         />
     );
    }
}

