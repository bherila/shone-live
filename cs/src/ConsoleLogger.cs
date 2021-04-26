using System;
using Microsoft.VisualBasic;

namespace Shone {
  public interface ILog {
    void Info(string logEntry);
    void Warn(string logEntry);
    void Error(string logEntry);
    void Metric(string logEntry, long stopwatchElapsedMilliseconds);
  }

  public class ConsoleLog : ILog {
    public void Info(string logEntry) {
      Console.ForegroundColor = ConsoleColor.Cyan;
      Console.WriteLine(logEntry);
    }
    
    public void Warn(string logEntry) {
      Console.ForegroundColor = ConsoleColor.DarkYellow;
      Console.WriteLine(logEntry);
    }
    
    public void Error(string logEntry) {
      Console.ForegroundColor = ConsoleColor.Red;
      Console.WriteLine(logEntry);
    }

    public void Metric(string logEntry, long stopwatchElapsedMilliseconds) {
      Console.ForegroundColor = ConsoleColor.Cyan;
      Console.WriteLine(logEntry + $" in {stopwatchElapsedMilliseconds}ms");
    }
  }
}
