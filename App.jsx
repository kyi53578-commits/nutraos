import { useState } from "react";

const SKUS=["Meraki Blu","BSO","Climax","Norma","Nano Silver","MAYU","Mix n Mingle"];
const STAFF=["Juliet","Adan","Britni","Mar'Kyi","Calvin"];

const INIT_INV=[
  {id:1,sku:"Meraki Blu",  qty:3722, thr:2000,coa:"released",updated:"2026-01-28",by:"Juliet"},
  {id:2,sku:"BSO",         qty:18161,thr:3000,coa:"released",updated:"2026-01-22",by:"Juliet"},
  {id:3,sku:"Climax",      qty:204,  thr:300, coa:"released",updated:"2026-03-23",by:"Juliet"},
  {id:4,sku:"Norma",       qty:1568, thr:500, coa:"released",updated:"2026-01-15",by:"Adan"},
  {id:5,sku:"Nano Silver", qty:0,    thr:200, coa:"pending",  updated:"2026-02-16",by:"Jeanette"},
  {id:6,sku:"MAYU",        qty:850,  thr:200, coa:"released",updated:"2026-01-22",by:"Juliet"},
  {id:7,sku:"Mix n Mingle",qty:312,  thr:250, coa:"released",updated:"2026-03-23",by:"Jeanette"},
];

const INIT_WO=[
  {id:"WO#73",sku:"Meraki Blu / Climax / Mix n Mingle",client:"Livbay",  target:12012,produced:12012,status:"complete",   start:"2026-03-23",staff:"Juliet",slip:true, ready:true, pickup:"2026-03-26"},
  {id:"WO#68",sku:"MAYU",                              client:"Internal",target:5000, produced:5000, status:"complete",   start:"2026-01-22",staff:"Juliet",slip:true, ready:true, pickup:"2026-01-22"},
  {id:"WO#65",sku:"Meraki Blu",                        client:"Meraki",  target:70000,produced:70000,status:"complete",   start:"2026-01-20",staff:"Juliet",slip:true, ready:true, pickup:"2026-01-21"},
  {id:"WO#64",sku:"BSO",                               client:"Internal",target:5000, produced:5000, status:"complete",   start:"2026-01-12",staff:"Adan",  slip:true, ready:true, pickup:"2026-01-23"},
  {id:"WO#63",sku:"Meraki Blu",                        client:"Meraki",  target:70000,produced:70000,status:"complete",   start:"2026-01-08",staff:"Juliet",slip:true, ready:true, pickup:"2026-01-09"},
  {id:"WO#74",sku:"BSO",                               client:"Internal",target:5000, produced:0,    status:"in_progress",start:"2026-04-08",staff:"Adan",  slip:false,ready:false,pickup:null},
];

const INIT_MAT=[
  {id:1,name:"BSO Drums",            qty:2,    unit:"drums",  thr:3,   supplier:"External",   lastDel:"2026-01-21",status:"low"},
  {id:2,name:"Neck Bands (BSO)",     qty:0,    unit:"units",  thr:500, supplier:"Veronica",   lastDel:"2026-02-05",status:"out"},
  {id:3,name:"Meraki Blu Labels",    qty:44664,unit:"labels", thr:5000,supplier:"External",   lastDel:"2026-01-28",status:"ok"},
  {id:4,name:"Climax Bottles",       qty:204,  unit:"bottles",thr:300, supplier:"Warehouse 2",lastDel:"2026-03-04",status:"low"},
  {id:5,name:"PETg Bottles (BSO)",   qty:700,  unit:"bottles",thr:1000,supplier:"Veronica",   lastDel:"2026-02-05",status:"low"},
];

const INIT_PROD=[
  {id:1,wo:"WO#73",sku:"Meraki Blu",date:"2026-03-24",crew:3,start:"8:00",end:"14:30",bottles:4290, rate:16,delay:null,       notes:"Normal run"},
  {id:2,wo:"WO#64",sku:"BSO",       date:"2026-01-22",crew:3,start:"8:00",end:"15:00",bottles:2572, rate:14,delay:null,       notes:"18,161 total in inv. with COAs. 6,435 awaiting release."},
  {id:3,wo:"WO#63",sku:"Meraki Blu",date:"2026-01-28",crew:3,start:"8:00",end:"14:31",bottles:4290, rate:15,delay:null,       notes:"31,031 produced total. 38,969 remaining on WO."},
  {id:4,wo:"WO#63",sku:"Meraki Blu",date:"2026-01-27",crew:3,start:"8:00",end:"11:24",bottles:2145, rate:14,delay:null,       notes:"6,292 on pallet ready to ship. 8,580 awaiting testing."},
  {id:5,wo:"WO#64",sku:"BSO",       date:"2026-01-21",crew:3,start:"10:30",end:"16:10",bottles:2860,rate:16,delay:"Setup/clean","notes":"Late start 10:30am — setup and minor clean. Flagged by Bruce."},
  {id:6,wo:"WO#64",sku:"BSO",       date:"2026-01-14",crew:3,start:"8:00",end:"14:00",bottles:1738, rate:13,delay:null,       notes:"2,658 on pallet. 2,342 remaining to finish WO."},
  {id:7,wo:"WO#64",sku:"Norma/BSO", date:"2026-01-15",crew:3,start:"8:00",end:"15:00",bottles:1568, rate:12,delay:"No neck bands",notes:"Out of neck bands. Last BSO drum broken/dirty."},
  {id:8,wo:"WO#64",sku:"BSO",       date:"2026-01-13",crew:3,start:"9:30",end:"14:21",bottles:836,  rate:10,delay:"Rework + label machine",notes:"120 reworked. Late start due to rework and label machine issue."},
];

const INIT_QC=[
  {id:1,wo:"WO#63",sku:"Meraki Blu",lot:"MBL-2026-01",batch:70000,status:"approved",spec:true, by:"Juliet",date:"2026-01-10",notes:"Clean run, full release."},
  {id:2,wo:"WO#64",sku:"BSO",       lot:"BSO-2026-01",batch:5000, status:"approved",spec:true, by:"Juliet",date:"2026-01-24",notes:"Delayed — spec sheet arrived late."},
  {id:3,wo:"WO#65",sku:"Meraki Blu",lot:"MBL-2026-02",batch:70000,status:"approved",spec:true, by:"Juliet",date:"2026-01-22",notes:""},
  {id:4,wo:"WO#68",sku:"MAYU",      lot:"MAYU-2026-01",batch:5000,status:"approved",spec:true, by:"Juliet",date:"2026-01-23",notes:""},
  {id:5,wo:"WO#73",sku:"Meraki Blu",lot:"MBL-2026-03",batch:12012,status:"approved",spec:true, by:"Juliet",date:"2026-03-25",notes:""},
  {id:6,wo:"WO#74",sku:"BSO",       lot:"BSO-2026-02",batch:5000, status:"pending", spec:false,by:null,    date:null,        notes:"Awaiting spec sheet from supplier."},
];

const INIT_ALERTS=[
  {id:1,type:"miscount",    sev:"high",  msg:"Climax: system 300 → floor count 264 → then 204. Client billed for 300. Bruce sourced extra from Warehouse 2.",date:"2026-03-04",resolved:true},
  {id:2,type:"stockout",    sev:"high",  msg:"Neck Bands (BSO): zero stock. Production halted on WO#64. No ETA from supplier.",date:"2026-01-15",resolved:true},
  {id:3,type:"no_paperwork",sev:"high",  msg:"Customer arrived for BSO pickup (1,222 bottles) with no packing slip ready.",date:"2026-01-14",resolved:true},
  {id:4,type:"coa_block",   sev:"medium",msg:"BSO WO#51: COA pending — awaiting spec sheet. Product on pallet, couldn't ship.",date:"2026-01-08",resolved:true},
  {id:5,type:"low_stock",   sev:"medium",msg:"Climax at 204 bottles — below threshold of 300.",date:"2026-03-23",resolved:false},
  {id:6,type:"low_stock",   sev:"medium",msg:"BSO Drums: 2 remaining — reorder threshold is 3.",date:"2026-04-08",resolved:false},
  {id:7,type:"late_start",  sev:"low",   msg:"WO#64 (BSO): started 10:30am vs 8:00am. Reason: setup and minor clean.",date:"2026-01-21",resolved:true},
];

const INIT_AUDIT=[
  {id:1,action:"Inventory recount (flagged)",item:"Climax",    from:300,   to:264,  by:"Juliet",  date:"2026-03-04",flag:true},
  {id:2,action:"Inventory update",           item:"Meraki Blu",from:0,     to:3722, by:"Juliet",  date:"2026-01-28",flag:false},
  {id:3,action:"Inventory update",           item:"BSO",       from:15589, to:18161,by:"Juliet",  date:"2026-01-22",flag:false},
  {id:4,action:"Inventory update",           item:"Climax",    from:264,   to:204,  by:"Juliet",  date:"2026-03-23",flag:false},
];

// colours
const C={bg:"#0a0c10",card:"#0f1117",bord:"#1e2130",bord2:"#2a3050",t1:"#e8eaf0",t2:"#8892aa",t3:"#555e78",t4:"#333b52",green:"#4ade80",blue:"#60a5fa",amb:"#fbbf24",red:"#f87171",gbg:"#152d1e",abg:"#2d2210",rbg:"#2d1515",bbg:"#1a2540"};

const Pill=({c,bg,children})=><span style={{display:"inline-block",padding:"2px 9px",borderRadius:99,background:bg,color:c,fontSize:10,fontWeight:700,letterSpacing:"0.03em",whiteSpace:"nowrap"}}>{children}</span>;

const I=({n,s=16})=>{
  const d={
    dash:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    inv:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    wo:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    prod:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    qc:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    mat:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    alert:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    audit:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    plus:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    print:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
    x:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    warn:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  };
  return d[n]||null;
};

const inp={width:"100%",padding:"8px 12px",background:"#1a1f2e",border:`1px solid ${C.bord2}`,borderRadius:8,color:C.t1,fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
const fL={fontSize:11,color:C.t3,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em",display:"block"};

export default function NutraOS(){
  const[tab,setTab]=useState("dashboard");
  const[inv,setInv]=useState(INIT_INV);
  const[wo,setWo]=useState(INIT_WO);
  const[mat]=useState(INIT_MAT);
  const[prod,setProd]=useState(INIT_PROD);
  const[qc,setQc]=useState(INIT_QC);
  const[alerts,setAlerts]=useState(INIT_ALERTS);
  const[audit,setAudit]=useState(INIT_AUDIT);
  const[invM,setInvM]=useState(null);
  const[invF,setInvF]=useState({qty:"",by:"Juliet"});
  const[slipM,setSlipM]=useState(null);
  const[newWO,setNewWO]=useState(false);
  const[woF,setWoF]=useState({id:"",sku:"",client:"",target:"",staff:"Juliet"});
  const[newP,setNewP]=useState(false);
  const[pF,setPF]=useState({wo:"",sku:"",date:"",crew:"3",start:"",end:"",bottles:"",delay:"",notes:""});

  const unres=alerts.filter(a=>!a.resolved).length;
  const addLog=e=>setAudit(p=>[{id:Date.now(),...e},...p]);

  const saveInv=item=>{
    const nq=parseInt(invF.qty);
    if(isNaN(nq)||nq<0)return;
    const diff=Math.abs(nq-item.qty),pct=item.qty>0?diff/item.qty:1,flag=pct>0.05;
    addLog({action:flag?"Inventory recount (flagged)":"Inventory update",item:item.sku,from:item.qty,to:nq,by:invF.by,date:new Date().toISOString().split("T")[0],flag});
    if(flag)setAlerts(p=>[...p,{id:Date.now(),type:"miscount",sev:"high",msg:`${item.sku}: was ${item.qty.toLocaleString()}, recount ${nq.toLocaleString()}. Discrepancy ${diff} bottles (${Math.round(pct*100)}%).`,date:new Date().toISOString().split("T")[0],resolved:false}]);
    if(nq<=item.thr)setAlerts(p=>[...p,{id:Date.now(),type:"low_stock",sev:"medium",msg:`${item.sku} at ${nq.toLocaleString()} — below threshold of ${item.thr}.`,date:new Date().toISOString().split("T")[0],resolved:false}]);
    setInv(p=>p.map(i=>i.id===item.id?{...i,qty:nq,updated:new Date().toISOString().split("T")[0],by:invF.by}:i));
    setInvM(null);setInvF({qty:"",by:"Juliet"});
  };

  const createWO=()=>{
    if(!woF.id||!woF.sku||!woF.client||!woF.target)return;
    setWo(p=>[{...woF,target:parseInt(woF.target),produced:0,status:"in_progress",start:new Date().toISOString().split("T")[0],slip:false,ready:false,pickup:null},...p]);
    setQc(p=>[...p,{id:Date.now(),wo:woF.id,sku:woF.sku,lot:`${woF.sku.slice(0,3).toUpperCase()}-NEW`,batch:parseInt(woF.target),status:"pending",spec:false,by:null,date:null,notes:""}]);
    setNewWO(false);setWoF({id:"",sku:"",client:"",target:"",staff:"Juliet"});
  };

  const saveProd=()=>{
    if(!pF.wo||!pF.sku||!pF.date||!pF.bottles)return;
    const[sh,sm]=(pF.start||"0:0").split(":").map(Number);
    const[eh,em]=(pF.end||"0:0").split(":").map(Number);
    const mins=(eh*60+em)-(sh*60+sm);
    const rate=mins>0?Math.round(parseInt(pF.bottles)/mins):0;
    setProd(p=>[{id:Date.now(),...pF,crew:parseInt(pF.crew),bottles:parseInt(pF.bottles),rate},...p]);
    if(pF.delay)setAlerts(p=>[...p,{id:Date.now(),type:"late_start",sev:"low",msg:`${pF.wo} (${pF.sku}): delay on ${pF.date}. Reason: ${pF.delay}.`,date:pF.date,resolved:false}]);
    setNewP(false);setPF({wo:"",sku:"",date:"",crew:"3",start:"",end:"",bottles:"",delay:"",notes:""});
  };

  const approveQC=id=>{
    const rec=qc.find(q=>q.id===id);
    setQc(p=>p.map(q=>q.id===id?{...q,status:"approved",spec:true,by:"Juliet",date:new Date().toISOString().split("T")[0]}:q));
    if(rec)setWo(p=>p.map(w=>w.id===rec.wo?{...w,slip:true,ready:true}:w));
  };

  const resolveAlert=id=>setAlerts(p=>p.map(a=>a.id===id?{...a,resolved:true}:a));

  const Bar=({val,max,color,h=5})=>(
    <div style={{height:h,background:C.bord,borderRadius:99,overflow:"hidden"}}>
      <div style={{width:Math.min(100,Math.round(val/max*100))+"%",height:"100%",background:color,borderRadius:99}}/>
    </div>
  );

  const StatCard=({label,value,color})=>(
    <div style={{background:C.card,border:`1px solid ${C.bord}`,borderRadius:12,padding:"18px 20px"}}>
      <div style={{fontSize:11,color:C.t3,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.08em"}}>{label}</div>
      <div style={{fontSize:34,fontWeight:700,color,lineHeight:1}}>{value}</div>
    </div>
  );

  const MiniBtn=({onClick,children,color=C.t3})=>(
    <button onClick={onClick} style={{padding:"5px 12px",borderRadius:7,border:`1px solid ${C.bord2}`,background:"transparent",color,fontSize:11,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>{children}</button>
  );

  const PriBtn=({onClick,children,full})=>(
    <button onClick={onClick} style={{padding:"8px 18px",borderRadius:8,border:"none",background:C.green,color:"#0a0c10",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6,...(full?{width:"100%",justifyContent:"center"}:{})}}>{children}</button>
  );

  const SecBtn=({onClick,children})=>(
    <button onClick={onClick} style={{padding:"8px 16px",borderRadius:8,border:`1px solid ${C.bord2}`,background:"transparent",color:C.t3,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>{children}</button>
  );

  const Hdr=({title,sub,action})=>(
    <div style={{marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div><h1 style={{fontSize:22,fontWeight:600,color:C.t1,margin:"0 0 4px"}}>{title}</h1><p style={{fontSize:13,color:C.t3,margin:0}}>{sub}</p></div>
      {action}
    </div>
  );

  const CardWrap=({children,border=C.bord,style={}})=>(
    <div style={{background:C.card,border:`1px solid ${border}`,borderRadius:12,...style}}>{children}</div>
  );

  const CardHead=({left,right})=>(
    <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.bord}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{fontSize:13,fontWeight:500}}>{left}</span>{right}
    </div>
  );

  const sColor=qty=>qty===0?C.red:qty>0?C.green:C.amb;
  const invStatus=(qty,thr)=>qty===0?"out":qty<=thr?"low":"ok";
  const invColor=(qty,thr)=>qty===0?C.red:qty<=thr?C.amb:C.green;
  const invBg=(qty,thr)=>qty===0?C.rbg:qty<=thr?C.abg:C.gbg;

  const TABS=[
    {id:"dashboard",label:"Dashboard",   icon:"dash"},
    {id:"inventory", label:"Inventory",  icon:"inv"},
    {id:"workorders",label:"Work orders",icon:"wo"},
    {id:"production",label:"Production", icon:"prod"},
    {id:"qc",        label:"QC / COA",   icon:"qc"},
    {id:"materials", label:"Materials",  icon:"mat"},
    {id:"alerts",    label:"Alerts",     icon:"alert",badge:unres},
    {id:"audit",     label:"Audit log",  icon:"audit"},
  ];

  // ── PACKING SLIP ──
  const Slip=({w})=>(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}}>
      <div style={{background:"#fff",borderRadius:16,padding:32,width:480,color:"#111",fontFamily:"'DM Sans',sans-serif"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",color:"#888",marginBottom:4}}>PACKING SLIP</div>
            <div style={{fontSize:20,fontWeight:700}}>Nutra Resolutions</div>
            <div style={{fontSize:12,color:"#666"}}>Production Order Fulfillment</div>
          </div>
          <button onClick={()=>setSlipM(null)} style={{background:"none",border:"none",cursor:"pointer",color:"#888"}}><I n="x" s={18}/></button>
        </div>
        <div style={{borderTop:"1px solid #eee",borderBottom:"1px solid #eee",padding:"16px 0",marginBottom:16}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {[["Work order",w.id],["Client",w.client],["Product",w.sku],["Quantity",w.target.toLocaleString()+" bottles"],["Pickup date",w.pickup||"TBD"],["Lead staff",w.staff]].map(([k,v])=>(
              <div key={k}><div style={{fontSize:10,color:"#999",textTransform:"uppercase",letterSpacing:"0.06em"}}>{k}</div><div style={{fontSize:13,fontWeight:500,marginTop:2}}>{v}</div></div>
            ))}
          </div>
        </div>
        <div style={{fontSize:11,color:"#aaa",marginBottom:16}}>Generated {new Date().toLocaleDateString()} · NutraOS · Auto-logged</div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>{addLog({action:"Packing slip generated",item:w.sku,from:null,to:w.target,by:"System",date:new Date().toISOString().split("T")[0],flag:false});window.print&&window.print();}} style={{flex:1,padding:10,borderRadius:8,border:"none",background:"#111",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><I n="print" s={14}/>Print / Save PDF</button>
          <button onClick={()=>setSlipM(null)} style={{padding:"10px 16px",borderRadius:8,border:"1px solid #ddd",background:"transparent",color:"#555",fontSize:13,cursor:"pointer"}}>Close</button>
        </div>
      </div>
    </div>
  );

  // ── PAGES ──
  const pages={

    dashboard:(
      <div>
        <Hdr title="Operations overview" sub={`Live · Nutra Resolutions · ${new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}`}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24}}>
          <StatCard label="SKUs tracked"       value={inv.length}                                       color={C.green}/>
          <StatCard label="Active work orders" value={wo.filter(w=>w.status==="in_progress").length}    color={C.blue}/>
          <StatCard label="Unresolved alerts"  value={unres}                                           color={unres>0?C.red:C.green}/>
          <StatCard label="Low / out of stock" value={inv.filter(i=>i.qty<=i.thr).length}              color={C.amb}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
          <CardWrap>
            <CardHead left="Inventory" right={<button onClick={()=>setTab("inventory")} style={{fontSize:11,color:C.green,background:"none",border:"none",cursor:"pointer"}}>View all →</button>}/>
            <div style={{padding:"8px 18px"}}>
              {inv.map(i=>{
                const c=invColor(i.qty,i.thr);
                return(
                  <div key={i.id} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:`1px solid ${C.bord}`}}>
                    <div style={{width:110,fontSize:12,color:C.t2,flexShrink:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{i.sku}</div>
                    <div style={{flex:1,height:4,background:C.bord,borderRadius:99}}><div style={{width:Math.min(100,Math.round(i.qty/(i.thr*5)*100))+"%",height:"100%",background:c,borderRadius:99}}/></div>
                    <div style={{width:60,textAlign:"right",fontSize:12,fontWeight:500,color:c}}>{i.qty.toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          </CardWrap>
          <CardWrap>
            <CardHead left="Production efficiency" right={<button onClick={()=>setTab("production")} style={{fontSize:11,color:C.green,background:"none",border:"none",cursor:"pointer"}}>View log →</button>}/>
            <div style={{padding:"14px 18px"}}>
              {(()=>{
                const avg=Math.round(prod.reduce((s,r)=>s+r.rate,0)/prod.length);
                const best=Math.max(...prod.map(r=>r.rate));
                const total=prod.reduce((s,r)=>s+r.bottles,0);
                const delays=prod.filter(r=>r.delay).length;
                return(
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    {[{l:"Avg btl/min",v:avg,c:C.green},{l:"Best rate",v:best,c:C.blue},{l:"Total bottled",v:total.toLocaleString(),c:C.t1},{l:"Delay incidents",v:delays,c:delays>0?C.amb:C.green}].map((s,i)=>(
                      <div key={i} style={{background:"#1a1f2e",borderRadius:10,padding:"12px 14px"}}>
                        <div style={{fontSize:10,color:C.t3,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>{s.l}</div>
                        <div style={{fontSize:22,fontWeight:700,color:s.c}}>{s.v}</div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </CardWrap>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <CardWrap>
            <CardHead left="Active work orders"/>
            <div style={{padding:"8px 18px"}}>
              {wo.filter(w=>w.status==="in_progress").length===0&&<p style={{fontSize:13,color:C.t3,padding:"8px 0"}}>No active work orders.</p>}
              {wo.filter(w=>w.status==="in_progress").map(w=>{
                const pct=w.target>0?Math.round(w.produced/w.target*100):0;
                return(
                  <div key={w.id} style={{padding:"10px 0",borderBottom:`1px solid ${C.bord}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:13,fontWeight:500,color:C.blue}}>{w.id}</span>
                      <span style={{fontSize:12,color:C.t3}}>{w.client}</span>
                    </div>
                    <div style={{fontSize:12,color:C.t2,marginBottom:8}}>{w.sku}</div>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <div style={{flex:1,height:5,background:C.bord,borderRadius:99}}><div style={{width:pct+"%",height:"100%",background:C.blue,borderRadius:99}}/></div>
                      <span style={{fontSize:11,color:C.t3}}>{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardWrap>
          <CardWrap>
            <CardHead left="Open alerts" right={<button onClick={()=>setTab("alerts")} style={{fontSize:11,color:unres>0?C.red:C.green,background:"none",border:"none",cursor:"pointer"}}>{unres} open →</button>}/>
            <div style={{padding:"8px 18px"}}>
              {alerts.filter(a=>!a.resolved).length===0&&<p style={{fontSize:13,color:C.green,padding:"8px 0"}}>All clear.</p>}
              {alerts.filter(a=>!a.resolved).map(a=>(
                <div key={a.id} style={{padding:"8px 0",borderBottom:`1px solid ${C.bord}`}}>
                  <div style={{display:"flex",gap:8,marginBottom:4,alignItems:"center"}}>
                    <Pill c={a.sev==="high"?C.red:C.amb} bg={a.sev==="high"?C.rbg:C.abg}>{a.sev}</Pill>
                    <span style={{fontSize:11,color:C.t3}}>{a.date}</span>
                  </div>
                  <div style={{fontSize:12,color:C.t2,lineHeight:1.5}}>{a.msg}</div>
                </div>
              ))}
            </div>
          </CardWrap>
        </div>
      </div>
    ),

    inventory:(
      <div>
        <Hdr title="Inventory" sub="Live bottle counts · auto-flags discrepancies >5% · COA status per SKU"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
          {inv.map(item=>{
            const c=invColor(item.qty,item.thr),bg=invBg(item.qty,item.thr),st=invStatus(item.qty,item.thr);
            return(
              <div key={item.id} style={{background:C.card,border:`1px solid ${st!=="ok"?c+"55":C.bord}`,borderRadius:12,padding:20}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div style={{fontSize:15,fontWeight:600,color:C.t1}}>{item.sku}</div>
                  <Pill c={c} bg={bg}>{st==="out"?"OUT":st==="low"?"LOW":"IN STOCK"}</Pill>
                </div>
                <div style={{fontSize:36,fontWeight:700,color:c,lineHeight:1,marginBottom:4}}>{item.qty.toLocaleString()}</div>
                <div style={{fontSize:12,color:C.t3,marginBottom:10}}>threshold: {item.thr.toLocaleString()}</div>
                <Bar val={item.qty} max={item.thr*4} color={c} h={4}/>
                <div style={{marginTop:10,marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:11,color:C.t4}}>Updated {item.updated} · {item.by}</span>
                  <Pill c={item.coa==="released"?C.green:C.amb} bg={item.coa==="released"?C.gbg:C.abg}>COA {item.coa}</Pill>
                </div>
                <button onClick={()=>{setInvM(item);setInvF({qty:item.qty,by:"Juliet"});}} style={{width:"100%",padding:8,borderRadius:8,border:`1px solid ${C.bord2}`,background:"transparent",color:C.t2,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Update count</button>
              </div>
            );
          })}
        </div>
      </div>
    ),

    workorders:(
      <div>
        <Hdr title="Work orders" sub="All WOs · production progress · packing slip · pickup status"
          action={<PriBtn onClick={()=>setNewWO(true)}><I n="plus" s={14}/>New WO</PriBtn>}/>
        {newWO&&(
          <div style={{background:C.card,border:`1px solid ${C.green}44`,borderRadius:12,padding:20,marginBottom:20}}>
            <div style={{fontSize:14,fontWeight:500,color:C.green,marginBottom:16}}>Create work order</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:14}}>
              {[{l:"WO #",k:"id",p:"WO#75"},{l:"SKU",k:"sku",p:"Meraki Blu"},{l:"Client",k:"client",p:"Livbay"},{l:"Target bottles",k:"target",p:"5000"},{l:"Lead staff",k:"staff",p:"Juliet"}].map(f=>(
                <div key={f.k}><label style={fL}>{f.l}</label><input value={woF[f.k]} onChange={e=>setWoF(p=>({...p,[f.k]:e.target.value}))} placeholder={f.p} style={inp}/></div>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}><PriBtn onClick={createWO}>Create</PriBtn><SecBtn onClick={()=>setNewWO(false)}>Cancel</SecBtn></div>
          </div>
        )}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {wo.map(w=>{
            const pct=w.target>0?Math.round(w.produced/w.target*100):0,done=w.status==="complete";
            return(
              <div key={w.id} style={{background:C.card,border:`1px solid ${C.bord}`,borderRadius:12,padding:20}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                    <span style={{fontSize:15,fontWeight:700,color:done?C.green:C.blue}}>{w.id}</span>
                    <span style={{fontSize:13,color:C.t2}}>{w.sku}</span>
                    <span style={{fontSize:12,color:C.t3}}>→ {w.client}</span>
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"flex-end"}}>
                    <Pill c={done?C.green:C.blue} bg={done?C.gbg:C.bbg}>{done?"Complete":"In progress"}</Pill>
                    <Pill c={w.slip?C.green:C.red} bg={w.slip?C.gbg:C.rbg}>{w.slip?"Slip ✓":"No slip"}</Pill>
                    {w.ready&&<Pill c={C.green} bg={C.gbg}>Ready for pickup</Pill>}
                  </div>
                </div>
                <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:10}}>
                  <div style={{flex:1,height:5,background:C.bord,borderRadius:99}}><div style={{width:pct+"%",height:"100%",background:done?C.green:C.blue,borderRadius:99}}/></div>
                  <span style={{fontSize:12,color:C.t3,minWidth:140,textAlign:"right"}}>{w.produced.toLocaleString()} / {w.target.toLocaleString()} bottles</span>
                  <span style={{fontSize:12,fontWeight:600,color:done?C.green:C.blue,minWidth:30,textAlign:"right"}}>{pct}%</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:11,color:C.t4}}>Started {w.start} · {w.staff}{w.pickup?` · Pickup: ${w.pickup}`:""}</span>
                  <MiniBtn onClick={()=>setSlipM(w)} color={w.slip?C.green:C.t3}><I n="print" s={12}/>{w.slip?"View slip":"Generate slip"}</MiniBtn>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),

    production:(
      <div>
        <Hdr title="Production log" sub="Every run logged · bottles/min · delay tracking · real efficiency data from Slack"
          action={<PriBtn onClick={()=>setNewP(true)}><I n="plus" s={14}/>Log run</PriBtn>}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {(()=>{
            const avg=Math.round(prod.reduce((s,r)=>s+r.rate,0)/prod.length);
            const best=Math.max(...prod.map(r=>r.rate));
            const total=prod.reduce((s,r)=>s+r.bottles,0);
            const delays=prod.filter(r=>r.delay).length;
            return[{l:"Avg rate (btl/min)",v:avg,c:C.green},{l:"Best rate",v:best,c:C.blue},{l:"Total bottles run",v:total.toLocaleString(),c:C.t1},{l:"Delay incidents",v:delays,c:delays>0?C.amb:C.green}].map((s,i)=>(
              <div key={i} style={{background:C.card,border:`1px solid ${C.bord}`,borderRadius:10,padding:"14px 16px"}}>
                <div style={{fontSize:10,color:C.t3,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>{s.l}</div>
                <div style={{fontSize:26,fontWeight:700,color:s.c}}>{s.v}</div>
              </div>
            ));
          })()}
        </div>
        {newP&&(
          <div style={{background:C.card,border:`1px solid ${C.green}44`,borderRadius:12,padding:20,marginBottom:20}}>
            <div style={{fontSize:14,fontWeight:500,color:C.green,marginBottom:16}}>Log production run</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:14}}>
              {[{l:"Work order",k:"wo",p:"WO#74",t:"text"},{l:"SKU",k:"sku",p:"BSO",t:"text"},{l:"Date",k:"date",p:"",t:"date"},{l:"Crew size",k:"crew",p:"3",t:"number"},{l:"Start time",k:"start",p:"08:00",t:"time"},{l:"End time",k:"end",p:"14:00",t:"time"},{l:"Bottles run",k:"bottles",p:"2500",t:"number"},{l:"Delay reason",k:"delay",p:"None",t:"text"}].map(f=>(
                <div key={f.k}><label style={fL}>{f.l}</label><input type={f.t} value={pF[f.k]} onChange={e=>setPF(p=>({...p,[f.k]:e.target.value}))} placeholder={f.p} style={inp}/></div>
              ))}
              <div style={{gridColumn:"1/-1"}}><label style={fL}>Notes</label><input value={pF.notes} onChange={e=>setPF(p=>({...p,notes:e.target.value}))} placeholder="Any notes..." style={inp}/></div>
            </div>
            <div style={{display:"flex",gap:8}}><PriBtn onClick={saveProd}>Save run</PriBtn><SecBtn onClick={()=>setNewP(false)}>Cancel</SecBtn></div>
          </div>
        )}
        <CardWrap>
          <div style={{display:"grid",gridTemplateColumns:"90px 70px 100px 55px 120px 85px 65px 1fr",padding:"10px 18px",borderBottom:`1px solid ${C.bord}`,fontSize:10,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em"}}>
            <span>Date</span><span>WO</span><span>SKU</span><span>Crew</span><span>Hours</span><span>Bottles</span><span>Btl/min</span><span>Delay / notes</span>
          </div>
          {prod.map(r=>(
            <div key={r.id} style={{display:"grid",gridTemplateColumns:"90px 70px 100px 55px 120px 85px 65px 1fr",padding:"11px 18px",borderBottom:`1px solid ${C.bord}`,fontSize:12,alignItems:"center"}}>
              <span style={{color:C.t3}}>{r.date}</span>
              <span style={{color:C.blue,fontWeight:500}}>{r.wo}</span>
              <span style={{color:C.t2}}>{r.sku}</span>
              <span style={{color:C.t3}}>{r.crew}</span>
              <span style={{color:C.t3}}>{r.start}–{r.end}</span>
              <span style={{color:C.t1,fontWeight:500}}>{r.bottles.toLocaleString()}</span>
              <span style={{color:r.rate>=15?C.green:r.rate>=12?C.amb:C.red,fontWeight:600}}>{r.rate}</span>
              <span style={{color:r.delay?C.amb:C.t4,fontSize:11}}>{r.delay?`⚠ ${r.delay}`:r.notes||"—"}</span>
            </div>
          ))}
        </CardWrap>
      </div>
    ),

    qc:(
      <div>
        <Hdr title="QC / COA tracker" sub="Certificate of Analysis per batch · approve to auto-enable packing slip and pickup"/>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {qc.map(q=>(
            <div key={q.id} style={{background:C.card,border:`1px solid ${q.status==="pending"?C.amb+"44":C.bord}`,borderRadius:12,padding:20}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:10}}>
                    <span style={{fontSize:15,fontWeight:600,color:q.status==="approved"?C.green:C.amb}}>{q.wo}</span>
                    <span style={{fontSize:13,color:C.t2}}>{q.sku}</span>
                    <Pill c={q.status==="approved"?C.green:C.amb} bg={q.status==="approved"?C.gbg:C.abg}>{q.status==="approved"?"COA Approved":"COA Pending"}</Pill>
                    <Pill c={q.spec?C.green:C.red} bg={q.spec?C.gbg:C.rbg}>{q.spec?"Spec sheet ✓":"No spec sheet"}</Pill>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:q.notes?8:0}}>
                    {[["Lot #",q.lot],["Batch",q.batch.toLocaleString()+" btl"],["Approved by",q.by||"—"],["Date",q.date||"—"]].map(([k,v])=>(
                      <div key={k}><div style={{fontSize:10,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em"}}>{k}</div><div style={{fontSize:12,color:C.t2,marginTop:2}}>{v}</div></div>
                    ))}
                  </div>
                  {q.notes&&<div style={{fontSize:12,color:C.t3,fontStyle:"italic"}}>{q.notes}</div>}
                </div>
                {q.status==="pending"&&<button onClick={()=>approveQC(q.id)} style={{marginLeft:16,padding:"8px 16px",borderRadius:8,border:"none",background:C.green,color:"#0a0c10",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>Approve COA</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    materials:(
      <div>
        <Hdr title="Raw materials" sub="Supply tracking · reorder thresholds · no more production stoppages"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:16}}>
          {mat.map(m=>{
            const sc={ok:{c:C.green,bg:C.gbg},low:{c:C.amb,bg:C.abg},out:{c:C.red,bg:C.rbg}}[m.status];
            return(
              <div key={m.id} style={{background:C.card,border:`1px solid ${m.status!=="ok"?sc.c+"44":C.bord}`,borderRadius:12,padding:20}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                  <div style={{fontSize:14,fontWeight:500,color:C.t1,lineHeight:1.4,paddingRight:8}}>{m.name}</div>
                  <Pill c={sc.c} bg={sc.bg}>{m.status.toUpperCase()}</Pill>
                </div>
                <div style={{fontSize:32,fontWeight:700,color:sc.c,lineHeight:1,marginBottom:4}}>{m.qty.toLocaleString()}</div>
                <div style={{fontSize:12,color:C.t3,marginBottom:10}}>{m.unit} · reorder at {m.thr}</div>
                <Bar val={m.qty} max={m.thr*4} color={sc.c} h={4}/>
                <div style={{marginTop:10,fontSize:11,color:C.t4}}>Supplier: {m.supplier} · Last: {m.lastDel}</div>
              </div>
            );
          })}
        </div>
      </div>
    ),

    alerts:(
      <div>
        <Hdr title="Alerts" sub={`${unres} unresolved · all seeded from real Slack incidents at Nutra Resolutions`}/>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[...alerts].sort((a,b)=>a.resolved-b.resolved).map(a=>{
            const sc={high:{c:C.red,bg:C.rbg},medium:{c:C.amb,bg:C.abg},low:{c:C.blue,bg:C.bbg}}[a.sev];
            return(
              <div key={a.id} style={{background:C.card,border:`1px solid ${a.resolved?C.bord:sc.c+"55"}`,borderRadius:12,padding:18,opacity:a.resolved?0.5:1}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",gap:8,marginBottom:6,alignItems:"center",flexWrap:"wrap"}}>
                      <Pill c={sc.c} bg={sc.bg}>{a.sev.toUpperCase()}</Pill>
                      <span style={{fontSize:10,color:C.t3,textTransform:"uppercase",letterSpacing:"0.05em"}}>{a.type.replace(/_/g," ")}</span>
                      <span style={{fontSize:10,color:C.t4}}>{a.date}</span>
                    </div>
                    <div style={{fontSize:13,color:C.t2,lineHeight:1.5}}>{a.msg}</div>
                  </div>
                  {a.resolved?<span style={{fontSize:11,color:C.green,flexShrink:0}}>✓ Resolved</span>:<button onClick={()=>resolveAlert(a.id)} style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${C.bord2}`,background:"transparent",color:C.green,fontSize:12,cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>Resolve</button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),

    audit:(
      <div>
        <Hdr title="Audit log" sub="Every inventory change, packing slip, and update — GMP-compliant paper trail"/>
        <CardWrap>
          <div style={{display:"grid",gridTemplateColumns:"110px 1fr 120px 80px 80px 80px",padding:"10px 18px",borderBottom:`1px solid ${C.bord}`,fontSize:10,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em"}}>
            <span>Date</span><span>Action</span><span>SKU</span><span>From</span><span>To</span><span>By</span>
          </div>
          {audit.map(l=>(
            <div key={l.id} style={{display:"grid",gridTemplateColumns:"110px 1fr 120px 80px 80px 80px",padding:"11px 18px",borderBottom:`1px solid ${C.bord}`,fontSize:12,alignItems:"center"}}>
              <span style={{color:C.t3}}>{l.date}</span>
              <span style={{color:C.t2,display:"flex",alignItems:"center",gap:6}}>{l.action}{l.flag&&<Pill c={C.red} bg={C.rbg}>FLAGGED</Pill>}</span>
              <span style={{color:C.blue}}>{l.item}</span>
              <span style={{color:C.t3}}>{l.from?.toLocaleString()??"—"}</span>
              <span style={{color:C.green,fontWeight:500}}>{l.to?.toLocaleString()??"—"}</span>
              <span style={{color:C.t3}}>{l.by}</span>
            </div>
          ))}
        </CardWrap>
      </div>
    ),
  };

  return(
    <div style={{fontFamily:"'DM Sans','Helvetica Neue',sans-serif",background:C.bg,minHeight:"100vh",color:C.t1,display:"flex"}}>
      <nav style={{width:216,background:C.card,borderRight:`1px solid ${C.bord}`,padding:"22px 0",display:"flex",flexDirection:"column",flexShrink:0,position:"sticky",top:0,height:"100vh",overflowY:"auto"}}>
        <div style={{padding:"0 18px 20px",borderBottom:`1px solid ${C.bord}`}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.14em",color:C.green,marginBottom:2}}>NutraOS</div>
          <div style={{fontSize:11,color:C.t4}}>Nutra Resolutions · v2</div>
        </div>
        <div style={{padding:"12px 8px",flex:1}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:8,border:"none",background:tab===t.id?"#1a1f2e":"transparent",color:tab===t.id?C.t1:C.t3,cursor:"pointer",fontSize:13,fontWeight:tab===t.id?500:400,marginBottom:1,textAlign:"left",fontFamily:"inherit"}}>
              <span style={{color:tab===t.id?C.green:"inherit",flexShrink:0}}><I n={t.icon} s={14}/></span>
              {t.label}
              {t.badge>0&&<span style={{marginLeft:"auto",background:C.red,color:"white",borderRadius:99,fontSize:9,fontWeight:700,padding:"1px 5px"}}>{t.badge}</span>}
            </button>
          ))}
        </div>
        <div style={{padding:"12px 18px",borderTop:`1px solid ${C.bord}`,fontSize:10,color:C.t4,lineHeight:1.5}}>Built by Daize<br/>AI Ops Consulting</div>
      </nav>
      <main style={{flex:1,padding:32,overflowY:"auto",minWidth:0}}>{pages[tab]}</main>
      {invM&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
          <div style={{background:C.card,border:`1px solid ${C.bord2}`,borderRadius:16,padding:28,width:380}}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:4}}>Update count</div>
            <div style={{fontSize:13,color:C.t3,marginBottom:20}}>{invM.sku} · current: {invM.qty.toLocaleString()}</div>
            <div style={{marginBottom:14}}>
              <label style={fL}>New count</label>
              <input type="number" value={invF.qty} onChange={e=>setInvF(p=>({...p,qty:e.target.value}))} style={{...inp,fontSize:18,padding:"10px 14px"}}/>
              {invF.qty&&!isNaN(parseInt(invF.qty))&&Math.abs(parseInt(invF.qty)-invM.qty)/(invM.qty||1)>0.05&&(
                <div style={{fontSize:11,color:C.amb,marginTop:6,display:"flex",gap:4,alignItems:"center"}}><I n="warn" s={12}/>Discrepancy over 5% — will be flagged in audit log</div>
              )}
            </div>
            <div style={{marginBottom:20}}>
              <label style={fL}>Updated by</label>
              <select value={invF.by} onChange={e=>setInvF(p=>({...p,by:e.target.value}))} style={inp}>{STAFF.map(s=><option key={s}>{s}</option>)}</select>
            </div>
            <div style={{display:"flex",gap:8}}><PriBtn onClick={()=>saveInv(invM)} full>Save</PriBtn><SecBtn onClick={()=>setInvM(null)}>Cancel</SecBtn></div>
          </div>
        </div>
      )}
      {slipM&&<Slip w={slipM}/>}
    </div>
  );
}
