package bitcamp.java89.ems2.domain;

public class Result extends Mentee {
  private static final long serialVersionUID = 1L;
  
  protected int resultNo;
  protected String type;
  protected String resultResult;
  
  public int getResultNumber() {
    return resultNo;
  }
  public void setResultNumber(int resultNumber) {
    this.resultNo = resultNumber;
  }
  public String getType() {
    return type;
  }
  public void setType(String type) {
    this.type = type;
  }
  public String getResultResult() {
    return resultResult;
  }
  public void setResultResult(String resultResult) {
    this.resultResult = resultResult;
  }
  
}
